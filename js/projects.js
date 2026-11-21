/* projects.js (both pages)
   Creating, renaming, duplicating and deleting projects. A project is a record in the Store:
   { id, name, folder, created, updated, files: {html, css, js}, names: {html, css, js} }. */

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function defaultNames() { return { html: 'index.html', css: 'style.css', js: 'script.js' }; }
function cloneFiles(f) { return { html: f.html, css: f.css, js: f.js }; }

// Each project is opened in the editor page: editor.html#<project id>
function openEditor(id) { leaveTo('editor.html#' + encodeURIComponent(id)); }

async function uniqueName(base) {
  var names = (await Store.all()).map(function (r) { return r.name; });
  if (names.indexOf(base) < 0) return base;
  for (var i = 2; ; i++) if (names.indexOf(base + ' ' + i) < 0) return base + ' ' + i;
}

async function createProject(kind) {
  var now = Date.now();
  var rec = {
    id: uid(), name: await uniqueName(kind === 'sample' ? 'Neumorphic Sign Up' : 'Untitled project'), folder: false,
    created: now, updated: now, files: cloneFiles(kind === 'sample' ? SAMPLE : STARTER), names: defaultNames()
  };
  await Store.put('projects', rec);
  openEditor(rec.id);
}

async function renameProject(id, name) {
  var rec = await Store.get('projects', id);
  if (!rec) return;
  rec.name = name;
  await Store.put('projects', rec);
}

async function duplicateProject(id) {
  var rec = await Store.get('projects', id);
  if (!rec) return null;
  var blobs = await Store.get('blobs', id);
  var now = Date.now();
  var copy = { id: uid(), name: await uniqueName(rec.name + ' copy'), folder: false, created: now, updated: now, files: cloneFiles(rec.files), names: rec.names };
  await Store.put('projects', copy);
  if (blobs) await Store.put('blobs', { id: copy.id, assets: blobs.assets || {}, texts: blobs.texts || {}, mapped: blobs.mapped }).catch(function () {});
  return copy;
}

async function removeProject(id) { await Store.del(id); }
