/* editor-state.js (editor page)
   The project that is open in the editor: its files (S.files, S.names), the extra data of a folder
   project (images, other CSS/JS, the folder link) and saving it back to the browser's database. */

// Heavy parts of a folder project. Everything else a page links to is inlined from here when previewing.
var project = { handle: null, assets: {}, texts: {}, mapped: { html: true, css: true, js: true } };
// Details of the open project
var cur = { id: '', name: '', folder: false, created: 0, updated: 0 };
var pending = false, persistTimer = 0;

var projEl = $('proj'), projName = $('proj-name'), projIcon = projEl.querySelector('svg'), saveBtn = $('save-folder');

async function loadProject(id) {
  var rec = await Store.get('projects', id);
  if (!rec) return false;
  var blobs = (await Store.get('blobs', id)) || {};
  cur = { id: rec.id, name: rec.name, folder: !!rec.folder, created: rec.created, updated: rec.updated };
  S.files = cloneFiles(rec.files);
  S.names = rec.names || defaultNames();
  S.active = 'html';
  project.handle = blobs.handle || null;
  project.assets = blobs.assets || {};
  project.texts = blobs.texts || {};
  project.mapped = blobs.mapped || { html: true, css: true, js: true };
  pending = false;
  return true;
}

function metaRecord() {
  return { id: cur.id, name: cur.name, folder: cur.folder, created: cur.created, updated: cur.updated, files: cloneFiles(S.files), names: { html: S.names.html, css: S.names.css, js: S.names.js } };
}
// Called after every edit. The save to the database is delayed a little so typing stays smooth.
function touchProject() {
  if (!cur.id) return;
  pending = true;
  clearTimeout(persistTimer);
  persistTimer = setTimeout(flushProject, 600);
}
function flushProject() {
  clearTimeout(persistTimer);
  if (!pending || !cur.id) return Promise.resolve();
  pending = false;
  cur.updated = Date.now();
  return Store.put('projects', metaRecord()).catch(function () { flash('Could not save this project in the browser'); });
}
function saveBlobs() {
  if (!cur.id) return Promise.resolve();
  var rec = { id: cur.id, assets: project.assets, texts: project.texts, mapped: project.mapped };
  if (project.handle) rec.handle = project.handle;
  return Store.put('blobs', rec).catch(function () {
    delete rec.handle; // some browsers cannot store a folder link
    return Store.put('blobs', rec).catch(function () {});
  });
}
window.addEventListener('pagehide', function () { flushProject(); });

function fileLabel(id) { return baseName(S.names[id]); }
function updateProjectUI() {
  tabs.forEach(function (t) {
    var n = S.names[t.dataset.id];
    t.querySelector('.tn').textContent = baseName(n);
    t.title = n;
  });
  projEl.hidden = !cur.id;
  projName.textContent = cur.name;
  projIcon.hidden = !cur.folder;
  projName.title = cur.name + (cur.folder ? (project.handle ? ' (connected to your folder)' : ' (copy of a folder, open the folder again to save to it)') : '');
  saveBtn.hidden = !project.handle;
}
function markDirty(on) { saveBtn.classList.toggle('dirty', !!on); }

function clearCurrent() {
  project.handle = null; project.assets = {}; project.texts = {};
  project.mapped = { html: true, css: true, js: true };
  S.names = defaultNames(); cur.folder = false;
  S.files = { html: '', css: '', js: '' };
  ta.value = '';
  render(); updateProjectUI(); markDirty(false);
  touchProject(); saveBlobs();
  runPreview();
  flash('Cleared');
  ta.focus();
}
