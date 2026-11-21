/* shell.js (both pages)
   Things every page needs: tiny DOM helpers, the status/toast line, moving between pages,
   the Auto / Light / Dark button, the Phone (9:16) frame and the narrow-screen toolbar modes. */

function $(id) { return document.getElementById(id); }
function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}
// addEventListener by id, quietly skipped when the page does not have that element
function on(id, type, fn) { var n = $(id); if (n) n.addEventListener(type, fn); return n; }

function stamp() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
// The editor shows messages in the preview bar (#status), the dashboard in #toast
function flash(text) { var n = $('status') || $('toast'); if (n) n.textContent = text; }

// Go to another page. The editor saves the open project first.
function leaveTo(url) {
  var p = typeof flushProject === 'function' ? flushProject() : null;
  Promise.resolve(p).then(function () { location.href = url; });
}

/* ---------- Theme: one button cycles Auto (follows the device), Light, Dark ---------- */
var THEMES = ['auto', 'light', 'dark'];
var THEME_NAMES = { auto: 'follow device', light: 'light', dark: 'dark' };
function applyTheme() {
  var root = document.documentElement;
  if (S.theme === 'light' || S.theme === 'dark') root.setAttribute('data-theme', S.theme);
  else root.removeAttribute('data-theme');
  var label = 'Theme: ' + THEME_NAMES[S.theme];
  Array.prototype.forEach.call(document.querySelectorAll('.theme-btn'), function (b) {
    b.dataset.state = S.theme; b.title = label; b.setAttribute('aria-label', label);
  });
}

/* ---------- Phone frame and narrow-screen modes ---------- */
var appEl = $('app');
function isCompact() { return appEl.hasAttribute('data-compact'); }
function applyPhone() {
  appEl.classList.toggle('phone', !!S.phone);
  document.body.classList.toggle('stage-bg', !!S.phone);
  var b = $('phone');
  if (b) b.setAttribute('aria-pressed', String(!!S.phone));
}
function checkCompact() {
  appEl.toggleAttribute('data-tight', appEl.clientWidth <= 1000);
  var c = appEl.clientWidth <= 820;
  if (c !== isCompact()) {
    appEl.toggleAttribute('data-compact', c);
    if (typeof applyLayout === 'function') applyLayout();
  }
}

function shellInit() {
  if (['auto', 'light', 'dark'].indexOf(S.theme) < 0) S.theme = 'auto';
  applyTheme();
  applyPhone();
  appEl.toggleAttribute('data-compact', appEl.clientWidth <= 820);
  appEl.toggleAttribute('data-tight', appEl.clientWidth <= 1000);

  Array.prototype.forEach.call(document.querySelectorAll('.theme-btn'), function (b) {
    b.addEventListener('click', function () {
      S.theme = THEMES[(THEMES.indexOf(S.theme) + 1) % THEMES.length];
      applyTheme(); save();
    });
  });
  on('phone', 'click', function () { S.phone = !S.phone; applyPhone(); checkCompact(); save(); });
  if (window.ResizeObserver) new ResizeObserver(checkCompact).observe(appEl);
  else window.addEventListener('resize', checkCompact);
}
