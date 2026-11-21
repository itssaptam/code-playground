/* editor-page.js (editor page)
   Starts the editor. The page address says which project to open: editor.html#<project id>.
   No project id, or an unknown one, sends you back to the dashboard. */

(async function () {
  var id = '';
  try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
  var ok = false;
  try { ok = id && await loadProject(id); } catch (e) {}
  if (!ok) { location.replace('dashboard.html'); return; }

  document.title = cur.name + ' - CtrlSaptam';
  autoEl.checked = !!S.auto;
  if (['html', 'css', 'js'].indexOf(S.active) < 0) S.active = 'html';
  if (!LAYOUTS[S.layout]) S.layout = 'cols';
  if (['code', 'both', 'preview'].indexOf(S.view) < 0) S.view = 'both';
  S.split = clampSplit(Number(S.split) || 50);
  tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.id === S.active)); });
  ta.value = S.files[S.active];
  render();

  shellInit();
  updateProjectUI();
  applyLayout();
  applyView();
  applyDevice();
  clearConsole();
  setConsole(!!S.console);
  runPreview();
  ta.setSelectionRange(0, 0);
  ta.scrollTop = 0;
  ta.focus({ preventScroll: true });

  // The logo goes back to the dashboard (after saving)
  on('brand', 'click', function (e) { e.preventDefault(); leaveTo('dashboard.html'); });
  // Opening another project in the same tab only changes the address, so reload to pick it up
  window.addEventListener('hashchange', function () { location.reload(); });
})();
