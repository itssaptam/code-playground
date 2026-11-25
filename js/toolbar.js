/* toolbar.js (editor page)
   The buttons in the top bar: Run, Auto-run and the More menu (copy, new project, clear...). */

$('run').addEventListener('click', runPreview);
$('reload').addEventListener('click', runPreview);
autoEl.addEventListener('change', function () { S.auto = autoEl.checked; save(); if (S.auto) runPreview(); });

var moreBtn = $('more'), menu = $('menu');
function setMenu(open) { menu.hidden = !open; moreBtn.setAttribute('aria-expanded', String(open)); }
moreBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(menu.hidden); });
document.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

$('copy').addEventListener('click', function () {
  var text = ta.value, name = fileLabel(S.active);
  setMenu(false);
  function fallback() {
    ta.focus(); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    ta.setSelectionRange(ta.selectionEnd, ta.selectionEnd);
    flash(ok ? 'Copied ' + name : 'Select the code and press Ctrl/Cmd + C');
  }
  try {
    navigator.clipboard.writeText(text).then(function () { flash('Copied ' + name); }, fallback);
  } catch (e) { fallback(); }
});

// Two-step button: the first click asks, the second click does it
function armed(btn, label, action) {
  var timer, on = false, idle = btn.textContent;
  btn.addEventListener('click', function () {
    if (!on) {
      on = true; btn.textContent = label; btn.classList.add('armed');
      timer = setTimeout(reset, 3000);
      return;
    }
    reset(); action();
  });
  function reset() { clearTimeout(timer); on = false; btn.textContent = idle; btn.classList.remove('armed'); }
}
$('open-folder').addEventListener('click', function () { setMenu(false); openFolder(); });
$('open-zip').addEventListener('click', function () { setMenu(false); openZip(); });
$('new-project').addEventListener('click', function () { setMenu(false); createProject('blank'); });
$('sample').addEventListener('click', function () { setMenu(false); createProject('sample'); });
armed($('clear'), 'Clear this code?', function () { setMenu(false); clearCurrent(); });
