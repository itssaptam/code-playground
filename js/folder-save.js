/* folder-save.js (editor page)
   Save (button or Ctrl/Cmd + S) writes the three files back into the connected project folder. */

async function fileHandleFor(root, path) {
  var parts = path.split('/'), d = root;
  for (var i = 0; i < parts.length - 1; i++) d = await d.getDirectoryHandle(parts[i]);
  return d.getFileHandle(parts[parts.length - 1]);
}
async function saveProject() {
  if (!project.handle) return;
  var n = 0;
  try {
    var h = project.handle;
    if (h.queryPermission) {
      var perm = await h.queryPermission({ mode: 'readwrite' });
      if (perm !== 'granted' && h.requestPermission) perm = await h.requestPermission({ mode: 'readwrite' });
      if (perm !== 'granted') { flash('Allow access to the folder to save'); return; }
    }
    for (var id of ['html', 'css', 'js']) {
      if (!project.mapped[id]) continue;
      var w = await (await fileHandleFor(h, S.names[id])).createWritable();
      await w.write(S.files[id]);
      await w.close();
      n++;
    }
    markDirty(false);
    flash('Saved ' + n + (n === 1 ? ' file' : ' files') + ' to ' + cur.name + ' at ' + stamp());
  } catch (e) {
    flash('Could not save: ' + (e && e.message ? e.message : 'permission denied'));
  }
}
saveBtn.addEventListener('click', saveProject);
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 's' && project.handle) {
    e.preventDefault();
    saveProject();
  }
});
