/* builder.js (both pages)
   Turns a project into one complete web page. A project is three editable files (HTML, CSS, JS).
   Everything else a folder project needs (other CSS or JS files, images, fonts) was read once when
   the folder was opened and is inlined here. The same builder makes the live preview in the editor
   and the thumbnails on the dashboard. */

var scrollPos = [0, 0]; // where the live preview was scrolled to, so an update keeps its place

function normPath(p) {
  var out = [];
  String(p).split('/').forEach(function (s) {
    if (!s || s === '.') return;
    if (s === '..') out.pop(); else out.push(s);
  });
  return out.join('/');
}
function dirOf(p) { var i = p.lastIndexOf('/'); return i < 0 ? '' : p.slice(0, i); }
function baseName(p) { return p.slice(p.lastIndexOf('/') + 1); }
// Turns a path written in a file into a path from the project root. Returns null for web links, data: URLs and #anchors.
function resolveRef(base, ref) {
  if (!ref) return null;
  ref = ref.trim();
  if (!ref || /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref)) return null;
  ref = ref.replace(/[?#].*$/, '');
  try { ref = decodeURIComponent(ref); } catch (e) {}
  return normPath(ref.charAt(0) === '/' ? ref : (base ? base + '/' : '') + ref);
}
function getAttr(tag, name) {
  var m = new RegExp('\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')', 'i').exec(tag);
  return m ? (m[1] !== undefined ? m[1] : m[2]) : null;
}
function fixAttrs(tag, names, base, assets) {
  names.forEach(function (name) {
    tag = tag.replace(new RegExp('(\\b' + name + '\\s*=\\s*)(["\'])(.*?)\\2', 'i'), function (m, pre, q, v) {
      var r = resolveRef(base, v), d = r !== null ? assets[r] : null;
      return d ? pre + q + d + q : m;
    });
  });
  return tag;
}
function fixCssUrls(css, base, assets) {
  return css.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, function (m, q, u) {
    var r = resolveRef(base, u), d = r !== null ? assets[r] : null;
    return d ? 'url(' + d + ')' : m; // unquoted, so it is safe inside style="..." attributes too
  });
}
function styleTag(css, live) { return '<style' + (live ? ' id="__pg_css"' : '') + '>' + css.replace(/<\/style/gi, '<\\/style') + '</style>'; }
function scriptTag(js, attrs) {
  attrs = (attrs || '').replace(/\s*\bsrc\s*=\s*(?:"[^"]*"|'[^']*')/i, '').replace(/\s+(?:defer|async)(?=\s|$)/gi, '');
  return '<script' + attrs + '>' + js.replace(/<\/script/gi, '<\\/script') + '<\/script>';
}

var buildInfo = { usedCss: false };
// P = { files, names, assets, texts }. opts.thumb builds the quiet version used on the dashboard.
function buildDocFor(P, opts) {
  opts = opts || {};
  var html = P.files.html, css = P.files.css, js = P.files.js, assets = P.assets || {}, texts = P.texts || {};
  var base = dirOf(normPath(P.names.html));
  var cssPath = normPath(P.names.css), jsPath = normPath(P.names.js);
  var cssFixed = fixCssUrls(css, dirOf(cssPath), assets);
  var usedCss = false, usedJs = false, deferred = [];

  var out = html.replace(/<link\b[^>]*>/gi, function (tag) {
    if (!/rel\s*=\s*["']?stylesheet/i.test(tag)) return fixAttrs(tag, ['href'], base, assets);
    var r = resolveRef(base, getAttr(tag, 'href'));
    if (r === null) return tag;
    if (r === cssPath) { if (usedCss) return ''; usedCss = true; return styleTag(cssFixed, true); }
    if (texts[r] !== undefined) return styleTag(fixCssUrls(texts[r], dirOf(r), assets));
    return tag;
  });

  out = out.replace(/<script\b([^>]*)>\s*<\/script>/gi, function (tag, attrs) {
    var r = resolveRef(base, getAttr(tag, 'src'));
    if (r === null) return tag;
    var code = null;
    if (r === jsPath) { if (usedJs) return ''; usedJs = true; code = js; }
    else if (texts[r] !== undefined) code = texts[r];
    if (code === null) return tag;
    var tagOut = scriptTag(code, attrs);
    // an inline script cannot be "deferred", so run it at the end of the page instead
    if (/\sdefer(?=\s|$)/i.test(attrs) && !/type\s*=\s*["']?module/i.test(attrs)) { deferred.push(tagOut); return ''; }
    return tagOut;
  });

  out = out.replace(/<(?:img|source|video|audio|track|input|embed)\b[^>]*>/gi, function (tag) {
    return fixAttrs(tag, ['src', 'poster'], base, assets);
  });

  if (!usedCss && css.trim()) {
    usedCss = true;
    if (/<\/head>/i.test(out)) out = out.replace(/<\/head>/i, function (m) { return styleTag(cssFixed, true) + m; });
    else out = styleTag(cssFixed, true) + out;
  }
  if (!usedJs && js.trim()) deferred.push(scriptTag(js));
  if (deferred.length) {
    var tail = deferred.join('');
    if (/<\/body>/i.test(out)) out = out.replace(/<\/body>/i, function (m) { return tail + m; });
    else out = out + tail;
  }
  out = fixCssUrls(out, base, assets); // style="background: url(...)" written in the HTML itself

  buildInfo.usedCss = usedCss;
  var hookTag = opts.thumb
    ? '<script>(' + miniHook.toString() + ')();<\/script>'
    : '<script>(' + hook.toString() + ')(' + JSON.stringify(scrollPos) + ');<\/script>';
  if (/<head[^>]*>/i.test(out)) return out.replace(/<head[^>]*>/i, function (m) { return m + hookTag; });
  var dt = /^\s*<!doctype[^>]*>/i.exec(out);
  if (dt) return dt[0] + hookTag + out.slice(dt[0].length);
  return hookTag + out;
}
