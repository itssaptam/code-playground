/* hooks.js (both pages)
   Small scripts that are injected into the page being previewed. They are turned into text with
   toString(), so they cannot use anything from the files around them. */

// This function runs inside the preview page. It is turned into text and injected, so it can't use anything from this file.
function hook(scroll) {
  var P = window.parent;
  function str(a) {
    if (typeof a === 'string') return a;
    if (a instanceof Error) return a.stack || a.message;
    if (typeof a === 'undefined') return 'undefined';
    if (typeof a === 'function') return a.toString();
    try { return JSON.stringify(a, null, 2); } catch (e) { return String(a); }
  }
  function send(level, args) {
    try { P.postMessage({ __pg: 1, level: level, args: args.map(str) }, '*'); } catch (e) {}
  }
  ['log', 'info', 'warn', 'error', 'debug'].forEach(function (k) {
    var orig = console[k];
    console[k] = function () { send(k, [].slice.call(arguments)); orig.apply(console, arguments); };
  });
  window.addEventListener('error', function (e) { send('error', [e.message]); });
  window.addEventListener('unhandledrejection', function (e) { send('error', ['Unhandled promise rejection: ' + str(e.reason)]); });

  // localStorage is blocked in a sandboxed frame, so give the page an in-memory stand-in
  function mk() {
    var m = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
      setItem: function (k, v) { m[k] = String(v); },
      removeItem: function (k) { delete m[k]; },
      clear: function () { m = {}; },
      key: function (i) { return Object.keys(m)[i] || null; },
      get length() { return Object.keys(m).length; }
    };
  }
  try { window.localStorage.getItem('x'); } catch (e) {
    try {
      Object.defineProperty(window, 'localStorage', { value: mk(), configurable: true });
      Object.defineProperty(window, 'sessionStorage', { value: mk(), configurable: true });
    } catch (_) {}
  }

  // Keep the scroll position between updates
  function restore() { try { window.scrollTo(scroll[0], scroll[1]); } catch (e) {} }
  document.addEventListener('DOMContentLoaded', restore);
  window.addEventListener('load', restore);
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      try { P.postMessage({ __pg: 2, x: window.scrollX, y: window.scrollY }, '*'); } catch (e) {}
    });
  }, { passive: true });

  // Live CSS updates
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.__pgcss !== 1 || typeof d.css !== 'string') return;
    var el = document.getElementById('__pg_css');
    if (el) el.textContent = d.css;
  });
}


// Runs inside every dashboard thumbnail: keeps pages from failing on blocked storage or opening dialogs
function miniHook() {
  function mk() {
    var m = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
      setItem: function (k, v) { m[k] = String(v); },
      removeItem: function (k) { delete m[k]; },
      clear: function () { m = {}; },
      key: function (i) { return Object.keys(m)[i] || null; },
      get length() { return Object.keys(m).length; }
    };
  }
  try { window.localStorage.getItem('x'); } catch (e) {
    try {
      Object.defineProperty(window, 'localStorage', { value: mk(), configurable: true });
      Object.defineProperty(window, 'sessionStorage', { value: mk(), configurable: true });
    } catch (_) {}
  }
  window.alert = window.confirm = window.prompt = function () { return null; };
  window.addEventListener('error', function (e) { if (e.preventDefault) e.preventDefault(); });
}
