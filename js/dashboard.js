/* dashboard.js (dashboard page)
   The project dashboard: a card for every project with a live thumbnail, search, sorting,
   rename, duplicate and delete. A click on a card opens it in editor.html. */

var dashEl = $('dash'), grid = $('grid'), searchEl = $('dash-search');
var cards = [], thumbObserver = null, dashToken = 0;
var ICON = {
  folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  plus: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  pencil: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6"/></svg>'
};
function iconBtn(cls, label, svg) {
  var b = el('button', 'icon-btn ' + cls);
  b.type = 'button'; b.title = label; b.setAttribute('aria-label', label); b.innerHTML = svg;
  return b;
}
function ago(ts) {
  var s = Math.max(0, (Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + ' min ago';
  if (s < 86400) return Math.floor(s / 3600) + ' h ago';
  if (s < 7 * 86400) return Math.floor(s / 86400) + ' d ago';
  return new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric', year: s > 300 * 86400 ? 'numeric' : undefined });
}

function loadThumb(card, rec) {
  Store.get('blobs', rec.id).then(function (blobs) {
    if (!card.isConnected) return;
    blobs = blobs || {};
    var f = document.createElement('iframe');
    f.className = 'thumb-frame';
    f.setAttribute('sandbox', 'allow-scripts');
    f.setAttribute('aria-hidden', 'true');
    f.tabIndex = -1;
    f.title = rec.name + ' preview';
    f.addEventListener('load', function () { card.classList.add('ready'); });
    f.srcdoc = buildDocFor({ files: rec.files, names: rec.names || defaultNames(), assets: blobs.assets, texts: blobs.texts }, { thumb: true });
    card.querySelector('.thumb-in').appendChild(f);
    setTimeout(function () { card.classList.add('ready'); }, 2500); // show it even if a slow font keeps the page loading
  });
}

function startRename(rec, open) {
  var input = el('input', 'card-rename');
  input.value = rec.name;
  input.setAttribute('aria-label', 'Project name');
  input.maxLength = 80;
  open.replaceWith(input);
  input.focus(); input.select();
  var done = false;
  function finish(commit) {
    if (done) return;
    done = true;
    var v = input.value.trim();
    input.replaceWith(open);
    if (commit && v && v !== rec.name) {
      rec.name = v; open.textContent = v; open.title = v;
      renameProject(rec.id, v);
      applyDashFilter();
    }
  }
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); finish(true); }
    else if (e.key === 'Escape') finish(false);
  });
  input.addEventListener('blur', function () { finish(true); });
}

function cardFor(rec) {
  var card = el('article', 'card');
  card.dataset.id = rec.id;
  var blank = !(rec.files.html.trim() || rec.files.css.trim() || rec.files.js.trim());

  var thumb = el('div', 'thumb');
  thumb.appendChild(el('div', 'thumb-in'));
  thumb.appendChild(el('div', 'thumb-note', blank ? 'Empty project' : 'Loading preview'));
  if (rec.folder) { var tag = el('span', 'thumb-tag'); tag.innerHTML = ICON.folder + 'Folder'; thumb.appendChild(tag); }

  var body = el('div', 'card-body'), top = el('div', 'card-top');
  var open = el('button', 'card-open', rec.name);
  open.type = 'button'; open.title = rec.name;
  open.addEventListener('click', function () { openEditor(rec.id); });

  var acts = el('div', 'card-actions');
  var ren = iconBtn('', 'Rename', ICON.pencil), dup = iconBtn('', 'Duplicate', ICON.copy), del = iconBtn('danger', 'Delete', ICON.trash);
  ren.addEventListener('click', function () { startRename(rec, card.querySelector('.card-open')); });
  dup.addEventListener('click', async function () {
    var copy = await duplicateProject(rec.id);
    if (copy) { addCard(copy); applyDashFilter(); if (window.showStorage) showStorage(); }
  });
  var delTimer;
  function disarm() { clearTimeout(delTimer); del.classList.remove('armed'); del.innerHTML = ICON.trash; del.setAttribute('aria-label', 'Delete'); }
  del.addEventListener('click', async function () {
    if (!del.classList.contains('armed')) {
      del.classList.add('armed'); del.textContent = 'Delete?'; del.setAttribute('aria-label', 'Confirm delete');
      delTimer = setTimeout(disarm, 3000);
      return;
    }
    disarm();
    await removeProject(rec.id);
    if (thumbObserver) thumbObserver.unobserve(card);
    card.remove();
    cards = cards.filter(function (c) { return c.node !== card; });
    applyDashFilter();
    if (window.showStorage) showStorage();
  });
  del.addEventListener('blur', disarm);
  acts.appendChild(ren); acts.appendChild(dup); acts.appendChild(del);
  top.appendChild(open); top.appendChild(acts);

  var meta = el('div', 'card-meta');
  var when = el('span', '', 'Edited ' + ago(rec.updated));
  meta.appendChild(when);
  if (window.showSize) showSize(rec, when);
  var chips = el('span', 'chips');
  [['HTML', 'html'], ['CSS', 'css'], ['JS', 'js']].forEach(function (c) {
    if (rec.files[c[1]].trim()) chips.appendChild(el('span', 'chip', c[0]));
  });
  meta.appendChild(chips);
  body.appendChild(top); body.appendChild(meta);
  card.appendChild(thumb); card.appendChild(body);
  card._load = blank ? null : function () { loadThumb(card, rec); };
  return card;
}

function addCard(rec) {
  var node = cardFor(rec);
  cards.push({ rec: rec, node: node });
  grid.appendChild(node);
  if (node._load && thumbObserver) thumbObserver.observe(node);
  else if (node._load) node._load();
  return node;
}

function tile(cls, svg, title, hint, onClick) {
  var b = el('button', 'tile ' + cls);
  b.type = 'button';
  b.innerHTML = svg;
  b.appendChild(el('strong', '', title));
  b.appendChild(el('small', '', hint));
  b.addEventListener('click', onClick);
  return b;
}

function byRecent(a, b) { return b.rec.updated - a.rec.updated; }
function byName(a, b) { return a.rec.name.localeCompare(b.rec.name, undefined, { sensitivity: 'base' }); }
function applyDashFilter() {
  var q = searchEl.value.trim().toLowerCase(), shown = 0;
  cards.slice().sort(S.sort === 'name' ? byName : byRecent).forEach(function (c, i) {
    var ok = !q || c.rec.name.toLowerCase().indexOf(q) >= 0;
    c.node.style.order = i;
    c.node.hidden = !ok;
    if (ok) shown++;
  });
  Array.prototype.forEach.call(grid.querySelectorAll('.tile'), function (t) { t.hidden = !!q; });
  $('dash-count').textContent = q ? shown + ' of ' + cards.length : cards.length + (cards.length === 1 ? ' project' : ' projects');
  var note = $('dash-note');
  note.hidden = !(q && !shown);
  if (q && !shown) note.textContent = 'No project matches "' + searchEl.value.trim() + '".';
  Array.prototype.forEach.call(document.querySelectorAll('#dash-sort [data-sort]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.sort === S.sort)); });
  updateThumbScale();
}

// The thumbnails render the page at 1280 x 800 and are scaled down to the card
function updateThumbScale() {
  var thumbs = grid.querySelectorAll('.thumb');
  for (var i = 0; i < thumbs.length; i++) {
    if (thumbs[i].clientWidth > 0) { grid.style.setProperty('--s', (thumbs[i].clientWidth / 1280).toFixed(4)); return; }
  }
}
if (window.ResizeObserver) new ResizeObserver(updateThumbScale).observe(grid);

async function renderDashboard() {
  var token = ++dashToken;
  var list = await Store.all();
  if (token !== dashToken) return;
  if (thumbObserver) thumbObserver.disconnect();
  grid.textContent = '';
  cards = [];
  if ('IntersectionObserver' in window) {
    thumbObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        thumbObserver.unobserve(e.target);
        if (e.target._load) e.target._load();
      });
    }, { root: dashEl, rootMargin: '300px' });
  } else thumbObserver = null;

  grid.appendChild(tile('tile-new', ICON.plus, 'New project', 'Start with a blank page', function () { createProject('blank'); }));
  grid.appendChild(tile('tile-open', ICON.folder.replace(/width="16" height="16"/, 'width="26" height="26"'), 'Open folder or zip', 'Load a project folder or a .zip file (you can also drop it here)', function (e) { openChooser(e.currentTarget); }));
  list.forEach(addCard);
  applyDashFilter();
  if (window.showStorage) showStorage();

  var note = $('dash-persist');
  note.hidden = Store.persistent();
  if (!Store.persistent()) note.textContent = 'This browser is not letting CtrlSaptam keep projects (a private window, for example). They will be lost when you close this tab.';
}

searchEl.addEventListener('input', applyDashFilter);
Array.prototype.forEach.call(document.querySelectorAll('#dash-sort [data-sort]'), function (b) {
  b.addEventListener('click', function () { S.sort = b.dataset.sort; save(); applyDashFilter(); });
});
on('brand', 'click', function (e) { e.preventDefault(); dashEl.scrollTop = 0; }); // already here
on('dash-new', 'click', function () { createProject('blank'); });
