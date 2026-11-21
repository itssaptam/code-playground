/* settings.js (both pages)
   Small interface preferences (theme, layout, sort order...). They are kept in localStorage.
   Projects are NOT stored here, they live in IndexedDB (see store.js). */
'use strict';

var KEY = 'ctrlsaptam-v1';
var S = {
  active: 'html', auto: true, layout: 'cols', split: 50, device: 'fit',
  phone: false, console: false, view: 'both', theme: 'auto', sort: 'recent'
};

// Code saved by the very first single-project version. It becomes a project on the dashboard.
var legacy = null;
try {
  var raw = localStorage.getItem(KEY) || localStorage.getItem('code-playground-v1');
  if (raw) {
    var o = JSON.parse(raw);
    Object.keys(S).forEach(function (k) { if (o[k] !== undefined) S[k] = o[k]; });
    if (o && o.files && typeof o.files.html === 'string' && typeof o.files.css === 'string' && typeof o.files.js === 'string') {
      var okNames = o.names && typeof o.names.html === 'string' && typeof o.names.css === 'string' && typeof o.names.js === 'string';
      legacy = { files: o.files, names: okNames ? o.names : null, name: typeof o.project === 'string' ? o.project : '' };
    }
  }
} catch (e) {}
if (S.sort !== 'name') S.sort = 'recent';

function persistUi() {
  try {
    var out = {};
    Object.keys(S).forEach(function (k) { if (k !== 'files' && k !== 'names') out[k] = S[k]; });
    localStorage.setItem(KEY, JSON.stringify(out));
  } catch (e) {}
}
var saveTimer;
function save() { clearTimeout(saveTimer); saveTimer = setTimeout(persistUi, 400); }
window.addEventListener('pagehide', persistUi);
