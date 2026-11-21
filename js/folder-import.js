/* folder-import.js (both pages)
   Open a project folder. Pick a folder that holds index.html, a CSS file and a JS file. The page is found
   first, then the CSS and JS files it links to. Images and fonts are inlined so they show in the preview.
   In Chrome and Edge the folder stays connected, so Save (Ctrl/Cmd + S) writes your edits back to it.
   The folder becomes a project in the database and opens in the editor. */

var folderInput = $('folder-input');
var IGNORE = /^(node_modules|dist|build|out|coverage|vendor)$/i;
var MAX_FILES = 3000, MAX_ASSET = 4 * 1024 * 1024, MAX_TOTAL = 40 * 1024 * 1024;
var MIME = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif',
  svg: 'image/svg+xml', ico: 'image/x-icon', bmp: 'image/bmp',
  woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf',
  mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', mp4: 'video/mp4', webm: 'video/webm'
};

function toDataUrl(file, type) {
  return new Promise(function (resolve) {
    var r = new FileReader();
    r.onload = function () { resolve(r.result); };
    r.onerror = function () { resolve(null); };
    r.readAsDataURL(type ? file.slice(0, file.size, type) : file);
  });
}
async function walk(dir, prefix, out, depth) {
  for await (var entry of dir.values()) {
    if (out.length >= MAX_FILES) return;
    if (entry.name.charAt(0) === '.') continue;
    if (entry.kind === 'directory') {
      if (depth < 6 && !IGNORE.test(entry.name)) await walk(entry, prefix + entry.name + '/', out, depth + 1);
    } else {
      out.push({ path: prefix + entry.name, file: await entry.getFile() });
    }
  }
}
function byDepth(a, b) { return a.split('/').length - b.split('/').length || a.localeCompare(b); }

async function openProject(entries, name, handle) {
  flash('Reading ' + name + '...');
  var map = {};
  entries.forEach(function (e) { map[e.path] = e.file; });
  var paths = Object.keys(map).sort(byDepth);
  var htmls = paths.filter(function (p) { return /\.html?$/i.test(p); });
  var htmlPath = htmls.filter(function (p) { return p.toLowerCase() === 'index.html'; })[0] ||
    htmls.filter(function (p) { return /(^|\/)index\.html?$/i.test(p); })[0] || htmls[0];
  if (!htmlPath) { flash('No HTML file found in ' + name); return; }

  var html = await map[htmlPath].text();
  var base = dirOf(htmlPath);
  function refs(tagRe, attr, test) {
    var out = [], m;
    tagRe.lastIndex = 0;
    while ((m = tagRe.exec(html))) {
      if (test && !test.test(m[0])) continue;
      var r = resolveRef(base, getAttr(m[0], attr));
      if (r !== null && map[r] !== undefined) out.push(r);
    }
    return out;
  }
  function pick(list, names) {
    for (var i = 0; i < names.length; i++) {
      var f = list.filter(function (p) { return baseName(p).toLowerCase() === names[i]; })[0];
      if (f) return f;
    }
    return null;
  }
  // Of the files the page links, prefer the usual names, otherwise the first one
  var linkedCss = refs(/<link\b[^>]*>/gi, 'href', /rel\s*=\s*["']?stylesheet/i).filter(function (p) { return /\.css$/i.test(p); });
  var linkedJs = refs(/<script\b[^>]*>/gi, 'src').filter(function (p) { return /\.m?js$/i.test(p); });
  var cssPath = pick(linkedCss, ['style.css', 'styles.css', 'main.css', 'index.css', 'app.css']) || linkedCss[0] ||
    pick(paths, ['style.css', 'styles.css', 'main.css', 'index.css']);
  var jsPath = pick(linkedJs, ['script.js', 'main.js', 'app.js', 'index.js']) || linkedJs[0] ||
    pick(paths, ['script.js', 'main.js', 'app.js', 'index.js']);

  var assets = {}, texts = {}, total = 0, count = 0;
  for (var i = 0; i < paths.length; i++) {
    var p = paths[i], f = map[p];
    if (p === htmlPath || p === cssPath || p === jsPath) continue;
    var m = /\.([a-z0-9]+)$/i.exec(p), ext = m ? m[1].toLowerCase() : '';
    if (ext === 'css' || ext === 'js' || ext === 'mjs') { if (f.size <= 2 * 1024 * 1024) texts[p] = await f.text(); }
    else if (MIME[ext] && f.size <= MAX_ASSET && total + f.size <= MAX_TOTAL) {
      var d = await toDataUrl(f, MIME[ext]);
      if (d) { assets[p] = d; total += f.size; count++; }
    }
  }

  var now = Date.now();
  var existing = (await Store.all()).filter(function (r) { return r.folder && r.name === name; })[0];
  var rec = {
    id: existing ? existing.id : uid(), name: name, folder: true,
    created: existing ? existing.created : now, updated: now,
    files: { html: html, css: cssPath ? await map[cssPath].text() : '', js: jsPath ? await map[jsPath].text() : '' },
    names: { html: htmlPath, css: cssPath || 'style.css', js: jsPath || 'script.js' }
  };
  await Store.put('projects', rec);
  var blobs = { id: rec.id, assets: assets, texts: texts, mapped: { html: true, css: !!cssPath, js: !!jsPath } };
  if (handle) blobs.handle = handle;
  await Store.put('blobs', blobs).catch(function () { delete blobs.handle; return Store.put('blobs', blobs); });
  openEditor(rec.id);
}

async function openFolder() {
  if (window.showDirectoryPicker) {
    try {
      var dir = await window.showDirectoryPicker({ id: 'ctrlsaptam', mode: 'readwrite' });
      var out = [];
      await walk(dir, '', out, 0);
      await openProject(out, dir.name, dir);
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      // blocked here (for example inside an embedded page): use the plain folder chooser instead
    }
  }
  folderInput.click();
}
folderInput.addEventListener('change', async function () {
  var list = Array.prototype.slice.call(folderInput.files || []);
  folderInput.value = '';
  if (!list.length) return;
  var name = (list[0].webkitRelativePath || '').split('/')[0] || 'Project';
  var entries = [];
  list.forEach(function (f) {
    var parts = (f.webkitRelativePath || f.name).split('/');
    parts.shift();
    var skip = parts.some(function (s, i) { return s.charAt(0) === '.' || (i < parts.length - 1 && IGNORE.test(s)); });
    if (!skip && parts.length && parts.length <= 8 && entries.length < MAX_FILES) entries.push({ path: parts.join('/'), file: f });
  });
  await openProject(entries, name, null);
});
on('open-folder-btn', 'click', openFolder);
on('dash-open', 'click', openFolder);
