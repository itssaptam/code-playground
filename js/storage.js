/* storage.js (dashboard page)
   Shows where projects are kept and how much room they use, asks the browser to keep them safe,
   and makes / restores a backup file. */

function fmtBytes(n) {
  if (n < 1024) return n + ' B';
  if (n < 1048576) return (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB';
  if (n < 1073741824) return (n / 1048576).toFixed(n < 10485760 ? 1 : 0) + ' MB';
  return (n / 1073741824).toFixed(1) + ' GB';
}

// Approximate size of one project: its code plus the images and files saved with it
function recBytes(rec, blobs) {
  var n = 0;
  ['html', 'css', 'js'].forEach(function (k) { n += (rec.files[k] || '').length; });
  if (blobs) {
    Object.keys(blobs.assets || {}).forEach(function (k) { n += Math.round(blobs.assets[k].length * 0.75); }); // data URL -> bytes
    Object.keys(blobs.texts || {}).forEach(function (k) { n += blobs.texts[k].length; });
  }
  return n;
}
var sizeCache = {}, sizeChain = Promise.resolve();
function projectBytes(rec) {
  if (!sizeCache[rec.id]) sizeCache[rec.id] = Store.get('blobs', rec.id).then(function (b) { return recBytes(rec, b); });
  return sizeCache[rec.id];
}
// Adds "· 14 KB" after the "Edited ..." text on a card (one project at a time, so big folders do not pile up in memory)
function showSize(rec, node) {
  sizeChain = sizeChain.then(function () { return projectBytes(rec); }).then(function (n) {
    if (node.isConnected) node.textContent += ' · ' + fmtBytes(n);
  }).catch(function () {});
}

async function showStorage() {
  var box = $('dash-storage-text');
  if (!box) return;
  var list = await Store.all(), total = 0;
  for (var i = 0; i < list.length; i++) total += await projectBytes(list[i]);
  var text = list.length + (list.length === 1 ? ' project uses ' : ' projects use ') + fmtBytes(total) + ' in this browser.';
  var safe = null, keep = $('keep-safe');
  try {
    if (navigator.storage && navigator.storage.estimate) {
      var e = await navigator.storage.estimate();
      if (e && e.quota) text += ' The browser allows about ' + fmtBytes(e.quota) + ' for this site.';
    }
    if (navigator.storage && navigator.storage.persisted) safe = await navigator.storage.persisted();
  } catch (err) {}
  if (safe === true) text += ' They are protected: the browser will not clear them on its own.';
  else if (safe === false) text += ' Not protected yet: the browser may clear them if the computer runs low on space.';
  box.textContent = text;
  if (keep) keep.hidden = safe !== false || !navigator.storage.persist;
}

on('keep-safe', 'click', async function () {
  try {
    var ok = await navigator.storage.persist();
    flash(ok ? 'Done. The browser will keep your projects.' : 'The browser did not agree. Use Backup to keep a copy.');
  } catch (e) { flash('This browser cannot do that. Use Backup to keep a copy.'); }
  showStorage();
});

/* ---------- Backup file ---------- */
async function exportBackup() {
  var projects = await Store.all(), blobs = await Store.allBlobs();
  var data = {
    app: 'ctrlsaptam', version: 1, exported: Date.now(), projects: projects,
    blobs: blobs.map(function (b) { return { id: b.id, assets: b.assets || {}, texts: b.texts || {}, mapped: b.mapped }; }) // the folder link is not included
  };
  var url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
  var a = document.createElement('a');
  a.href = url; a.download = 'ctrlsaptam-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  flash('Backup file made (' + projects.length + (projects.length === 1 ? ' project)' : ' projects)'));
}

async function importBackup(file) {
  try {
    var data = JSON.parse(await file.text()), n = 0;
    if (!data || data.app !== 'ctrlsaptam' || !Array.isArray(data.projects)) throw new Error('not a CtrlSaptam backup');
    for (var i = 0; i < data.projects.length; i++) {
      var p = data.projects[i];
      if (!p || typeof p.id !== 'string' || typeof p.name !== 'string' || !p.files) continue;
      p.names = p.names || defaultNames();
      await Store.put('projects', p);
      n++;
    }
    for (var j = 0; j < (data.blobs || []).length; j++) {
      if (data.blobs[j] && typeof data.blobs[j].id === 'string') await Store.put('blobs', data.blobs[j]);
    }
    sizeCache = {};
    flash('Restored ' + n + (n === 1 ? ' project' : ' projects'));
    await renderDashboard();
  } catch (e) {
    flash('That file is not a CtrlSaptam backup');
  }
}

on('backup-export', 'click', exportBackup);
on('backup-import', 'click', function () { $('backup-input').click(); });
on('backup-input', 'change', function (e) {
  var f = e.target.files && e.target.files[0];
  e.target.value = '';
  if (f) importBackup(f);
});
