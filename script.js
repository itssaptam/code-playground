(function () {
  'use strict';

  /* ---------- Starter project: a neumorphic sign-up card ---------- */
  var SAMPLE = {
    html: [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>Sign Up Form UI</title>',
      '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">',
      '  <link rel="stylesheet" href="style.css">',
      '</head>',
      '<body>',
      '  <div class="bg-circle bg1"></div>',
      '  <div class="bg-circle bg2"></div>',
      '  <div class="bg-circle bg3"></div>',
      '',
      '  <main class="card">',
      '    <div class="avatar">',
      '      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="7.5" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>',
      '    </div>',
      '    <h1>Create Account</h1>',
      '    <p class="sub">Start your journey with us</p>',
      '',
      '    <form id="form" novalidate>',
      '      <input id="name" type="text" placeholder="Full Name" autocomplete="off">',
      '      <input id="email" type="email" placeholder="Email Address" autocomplete="off">',
      '      <div class="pw">',
      '        <input id="pw" type="password" placeholder="Password" autocomplete="off">',
      '        <button type="button" class="eye" id="eye" aria-label="Show password">',
      '          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
      '        </button>',
      '      </div>',
      '      <input id="pw2" type="password" placeholder="Confirm Password" autocomplete="off">',
      '      <button class="primary" type="submit">Create Account</button>',
      '      <p id="msg" role="status"></p>',
      '    </form>',
      '',
      '    <p class="foot">Already have an account? <a href="#">Log in</a></p>',
      '  </main>',
      '',
      '  <script src="script.js"><\/script>',
      '</body>',
      '</html>'
    ].join('\n'),
    css: [
      ':root {',
      '  --bg: #e8ecf3;',
      '  --light: #ffffff;',
      '  --shadow: #c5ccda;',
      '  --text: #2b3245;',
      '  --muted: #8a93a6;',
      '  --blue: #2f6bff;',
      '}',
      '',
      '* { box-sizing: border-box; margin: 0; padding: 0; }',
      '',
      'body {',
      '  min-height: 100vh;',
      '  display: grid;',
      '  place-items: center;',
      '  padding: 70px 16px 40px;',
      '  position: relative;',
      '  overflow-x: hidden;',
      '  background: var(--bg);',
      '  color: var(--text);',
      "  font-family: 'Poppins', system-ui, sans-serif;",
      '}',
      '',
      '/* Soft background bubbles */',
      '.bg-circle {',
      '  position: absolute;',
      '  border-radius: 50%;',
      '  background: var(--bg);',
      '  box-shadow: 18px 18px 36px var(--shadow), -18px -18px 36px var(--light);',
      '}',
      '.bg1 { width: 220px; height: 220px; top: 6%; left: -70px; }',
      '.bg2 { width: 60px; height: 60px; top: 22%; right: 12%; }',
      '.bg3 { width: 150px; height: 150px; bottom: 6%; right: -40px; }',
      '',
      '.card {',
      '  position: relative;',
      '  width: min(340px, 100%);',
      '  padding: 48px 28px 28px;',
      '  border-radius: 28px;',
      '  background: var(--bg);',
      '  box-shadow: 20px 20px 44px var(--shadow), -20px -20px 44px var(--light);',
      '  text-align: center;',
      '}',
      '',
      '.avatar {',
      '  position: absolute;',
      '  top: -34px;',
      '  left: 50%;',
      '  transform: translateX(-50%);',
      '  width: 68px;',
      '  height: 68px;',
      '  display: grid;',
      '  place-items: center;',
      '  border-radius: 50%;',
      '  color: var(--blue);',
      '  background: var(--bg);',
      '  box-shadow: 6px 6px 12px var(--shadow), -6px -6px 12px var(--light);',
      '}',
      '',
      'h1 { font-size: 1.4rem; font-weight: 700; }',
      '.sub { font-size: 0.7rem; color: var(--muted); margin: 4px 0 22px; }',
      'form { display: grid; gap: 14px; }',
      '',
      'input {',
      '  width: 100%;',
      '  border: 0;',
      '  outline: 0;',
      '  padding: 13px 16px;',
      '  border-radius: 12px;',
      '  background: var(--bg);',
      '  color: var(--text);',
      '  font: inherit;',
      '  font-size: 0.78rem;',
      '  box-shadow: inset 5px 5px 10px var(--shadow), inset -5px -5px 10px var(--light);',
      '}',
      'input:focus {',
      '  box-shadow: inset 5px 5px 10px var(--shadow), inset -5px -5px 10px var(--light), 0 0 0 2px rgba(47, 107, 255, 0.35);',
      '}',
      '',
      '.pw { position: relative; }',
      '.pw input { padding-right: 44px; }',
      '.eye {',
      '  position: absolute;',
      '  right: 12px;',
      '  top: 50%;',
      '  transform: translateY(-50%);',
      '  display: grid;',
      '  border: 0;',
      '  background: none;',
      '  color: var(--muted);',
      '  cursor: pointer;',
      '}',
      '',
      '.primary {',
      '  border: 0;',
      '  cursor: pointer;',
      '  padding: 14px;',
      '  border-radius: 12px;',
      '  background: var(--bg);',
      '  color: var(--blue);',
      "  font: 700 0.75rem 'Poppins', sans-serif;",
      '  letter-spacing: 0.06em;',
      '  text-transform: uppercase;',
      '  box-shadow: 6px 6px 12px var(--shadow), -6px -6px 12px var(--light);',
      '}',
      '.primary:active {',
      '  box-shadow: inset 4px 4px 8px var(--shadow), inset -4px -4px 8px var(--light);',
      '}',
      '',
      '#msg { min-height: 1.2em; font-size: 0.7rem; color: var(--muted); }',
      '#msg.error { color: #d6336c; }',
      '#msg.ok { color: #2b8a3e; }',
      '',
      '.foot { margin-top: 18px; font-size: 0.7rem; color: var(--muted); }',
      '.foot a { color: var(--blue); font-weight: 600; text-decoration: none; }'
    ].join('\n'),
    js: [
      "const form = document.getElementById('form');",
      "const msg = document.getElementById('msg');",
      "const pw = document.getElementById('pw');",
      "const eye = document.getElementById('eye');",
      '',
      '// Show or hide the password',
      "eye.addEventListener('click', () => {",
      "  const hidden = pw.type === 'password';",
      "  pw.type = hidden ? 'text' : 'password';",
      "  eye.setAttribute('aria-label', hidden ? 'Hide password' : 'Show password');",
      '});',
      '',
      'function show(text, kind) {',
      '  msg.textContent = text;',
      "  msg.className = kind || '';",
      '}',
      '',
      "form.addEventListener('submit', (e) => {",
      '  e.preventDefault();',
      '  const name = form.name.value.trim();',
      '  const email = form.email.value.trim();',
      '',
      "  if (!name || !email) return show('Please fill in every field.', 'error');",
      "  if (!email.includes('@') || !email.includes('.')) return show('Enter a valid email address.', 'error');",
      "  if (pw.value.length < 8) return show('Password needs at least 8 characters.', 'error');",
      "  if (pw.value !== form.pw2.value) return show('Passwords do not match.', 'error');",
      '',
      "  show('Welcome aboard, ' + name + '!', 'ok');",
      "  console.log('Account created for', email);",
      '});'
    ].join('\n')
  };

  /* ---------- State ---------- */
  var KEY = 'ctrlsaptam-v1';
  var S = {
    files: { html: SAMPLE.html, css: SAMPLE.css, js: SAMPLE.js },
    active: 'html', auto: true, layout: 'cols', split: 50, device: 'fit', phone: false, console: false, view: 'both', theme: 'auto'
  };
  try {
    var raw = localStorage.getItem(KEY) || localStorage.getItem('code-playground-v1');
    if (raw) {
      var o = JSON.parse(raw);
      if (o && o.files && typeof o.files.html === 'string' && typeof o.files.css === 'string' && typeof o.files.js === 'string') {
        S.files = o.files;
        ['active', 'auto', 'layout', 'split', 'device', 'phone', 'console', 'view', 'theme'].forEach(function (k) { if (o[k] !== undefined) S[k] = o[k]; });
      }
    }
  } catch (e) {}
  var saveTimer;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 400);
  }
  window.addEventListener('pagehide', function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} });

  /* ---------- Elements ---------- */
  function $(id) { return document.getElementById(id); }
  var ta = $('ta'), hl = $('hl'), stage = $('stage');
  var statusEl = $('status'), autoEl = $('auto'), resizer = $('resizer');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var scrollMem = { html: 0, css: 0, js: 0 };
  var NAMES = { html: 'index.html', css: 'style.css', js: 'script.js' };

  /* ---------- Syntax highlighting ---------- */
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function sp(c, s) {
    return s.split('\n').map(function (p) { return '<span class="t-' + c + '">' + esc(p) + '</span>'; }).join('\n');
  }
  function run(src, re, fn) {
    var out = '', last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(src))) {
      if (m[0] === '') { re.lastIndex++; continue; }
      out += esc(src.slice(last, m.index)) + fn(m, src, re.lastIndex);
      last = m.index + m[0].length;
    }
    return out + esc(src.slice(last));
  }
  var RE_HTML = /(<!-{2}[\s\S]*?(?:-{2}>|$))|(<!doctype[^>]*>)|(<\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)(\/?>)?/gi;
  var RE_ATTR = /("[^"]*"|'[^']*')|([^\s=\/"']+)/g;
  function hlHTML(src) {
    return run(src, RE_HTML, function (m) {
      if (m[1]) return sp('com', m[1]);
      if (m[2]) return sp('kw', m[2]);
      var attrs = run(m[5] || '', RE_ATTR, function (a) { return a[1] ? sp('str', a[1]) : sp('attr', a[2]); });
      return sp('punc', m[3]) + sp('tag', m[4]) + attrs + (m[6] ? sp('punc', m[6]) : '');
    });
  }
  var RE_CSS = /(\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|(-?(?:\d*\.)?\d+(?:px|r?em|vh|vw|vmin|vmax|ch|ms|s|deg|fr|%)?)|(-{0,2}[a-zA-Z_][\w-]*)/g;
  function hlCSS(src) {
    return run(src, RE_CSS, function (m, s, end) {
      if (m[1]) return sp('com', m[1]);
      if (m[2]) return sp('str', m[2]);
      if (m[3]) return sp('kw', m[3]);
      if (m[4]) return sp('num', m[4]);
      if (m[5]) return sp('num', m[5]);
      var prev = s.charAt(m.index - 1);
      if (prev === '.' || prev === '#') return esc(m[6]);
      if (s.charAt(end) === '(') return sp('fn', m[6]);
      var mm = /^\s*:[^;{}]*([;{}]|$)/.exec(s.slice(end, end + 300));
      if (mm && mm[1] !== '{') return sp('prop', m[6]);
      return esc(m[6]);
    });
  }
  var RE_JS = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|(`(?:\\[\s\S]|[^`\\])*`?|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(\b(?:0x[\da-fA-F]+|\d[\d_]*(?:\.\d+)?)\b)|(\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|import|from|export|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|null|undefined|true|false|void|delete|yield|static|get|set)\b)|(\b[A-Za-z_$][\w$]*(?=\s*\())/g;
  function hlJS(src) {
    return run(src, RE_JS, function (m) {
      if (m[1]) return sp('com', m[1]);
      if (m[2]) return sp('str', m[2]);
      if (m[3]) return sp('num', m[3]);
      if (m[4]) return sp('kw', m[4]);
      return sp('fn', m[5]);
    });
  }
  var HL = { html: hlHTML, css: hlCSS, js: hlJS };

  /* ---------- Editor rendering ---------- */
  function render() {
    var lines = HL[S.active](ta.value).split('\n');
    var out = '';
    for (var i = 0; i < lines.length; i++) out += '<div class="l">' + lines[i] + '</div>';
    hl.innerHTML = out;
    syncScroll();
  }
  function syncScroll() { hl.scrollTop = ta.scrollTop; }
  ta.addEventListener('scroll', syncScroll);

  // Vertical position of a character offset, measured in the highlighted copy (works with wrapped lines)
  function caretY(pos) {
    var before = ta.value.slice(0, pos), row = before.split('\n').length - 1;
    var line = hl.children[row];
    if (!line) return 0;
    var col = pos - (before.lastIndexOf('\n') + 1), y = line.offsetTop;
    var walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT), n, left = col;
    while ((n = walker.nextNode())) {
      if (left <= n.length) {
        var r = document.createRange();
        r.setStart(n, left); r.setEnd(n, left);
        var rect = r.getClientRects()[0] || r.getBoundingClientRect();
        if (rect && rect.height) y = rect.top - hl.getBoundingClientRect().top + hl.scrollTop;
        break;
      }
      left -= n.length;
    }
    return y;
  }
  // Scroll so the caret is visible, centred when it was off screen
  function revealCaret() {
    var y = caretY(ta.selectionEnd), top = ta.scrollTop, h = ta.clientHeight;
    if (y < top + 20 || y > top + h - 100) ta.scrollTop = Math.max(0, y - h / 2);
    syncScroll();
  }

  function setActive(id) {
    scrollMem[S.active] = ta.scrollTop;
    S.active = id;
    tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.id === id)); });
    ta.value = S.files[id];
    render();
    ta.scrollTop = scrollMem[id];
    syncScroll();
    save();
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { setActive(t.dataset.id); ta.focus(); }); });

  function onInput(e) {
    var history = e && /^history/.test(e.inputType || '');
    if (history) { var p = ta.selectionEnd; ta.setSelectionRange(p, p); } // undo/redo: just a caret, no highlighted text
    S.files[S.active] = ta.value;
    render();
    if (history) {
      revealCaret();
      requestAnimationFrame(function () {
        if (ta.selectionStart !== ta.selectionEnd) { var q = ta.selectionEnd; ta.setSelectionRange(q, q); }
        revealCaret();
      });
    }
    save();
    if (S.auto) scheduleRun();
  }
  ta.addEventListener('input', onInput);

  function insert(text) {
    if (!document.execCommand('insertText', false, text)) {
      ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, 'end');
      onInput();
    }
  }
  function lineStart(v, pos) { return pos === 0 ? 0 : v.lastIndexOf('\n', pos - 1) + 1; }

  function shiftLines(dedent) {
    var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
    var ls = lineStart(v, s), le = v.indexOf('\n', e);
    if (le < 0) le = v.length;
    var first = 0, total = 0;
    var out = v.slice(ls, le).split('\n').map(function (l, i) {
      var d;
      if (dedent) { var m = /^ {1,2}/.exec(l); d = m ? -m[0].length : 0; l = l.slice(-d); }
      else { d = 2; l = '  ' + l; }
      if (i === 0) first = d;
      total += d;
      return l;
    }).join('\n');
    ta.setSelectionRange(ls, le);
    insert(out);
    ta.setSelectionRange(Math.max(ls, s + first), Math.max(ls, e + total));
  }

  ta.addEventListener('keydown', function (e) {
    if (e.isComposing) return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runPreview(); return; }
    if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      var multi = ta.value.slice(ta.selectionStart, ta.selectionEnd).indexOf('\n') >= 0;
      if (multi || e.shiftKey) shiftLines(e.shiftKey); else insert('  ');
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      var v = ta.value, s = ta.selectionStart, en = ta.selectionEnd;
      var indent = /^[ \t]*/.exec(v.slice(lineStart(v, s), s))[0];
      var prev = s > 0 ? v.charAt(s - 1) : '', next = v.charAt(en);
      var pairs = { '{': '}', '[': ']', '(': ')' };
      var opens = pairs[prev] !== undefined && s === en;
      var htmlOpen = S.active === 'html' && prev === '>' && v.slice(en, en + 2) === '</';
      if ((opens && next === pairs[prev]) || htmlOpen) {
        insert('\n' + indent + '  \n' + indent);
        var pos = s + 1 + indent.length + 2;
        ta.setSelectionRange(pos, pos);
      } else if (opens) {
        insert('\n' + indent + '  ');
      } else {
        insert('\n' + indent);
      }
    }
  });

  /* ---------- Preview ----------
     Two stacked iframes. A new version of the page loads in the hidden one and is swapped in
     once it is ready, so the preview never flashes. CSS edits skip the reload completely. */
  var frameA = $('frame-a'), frameB = $('frame-b');
  var front = frameA, back = frameB;
  front.classList.add('is-front');
  var scrollPos = [0, 0], cssLive = false, runToken = 0, timers = {};

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

  var LINK_RE = /<link\b[^>]*href=["'](?:\.\/)?style\.css["'][^>]*>/i;
  var SCRIPT_RE = /<script\b[^>]*src=["'](?:\.\/)?script\.js["'][^>]*>\s*<\/script>/i;
  function styleTag(css) { return '<style id="__pg_css">' + css.replace(/<\/style/gi, '<\\/style') + '</style>'; }
  function scriptTag(js) { return '<script>' + js.replace(/<\/script/gi, '<\\/script') + '<\/script>'; }

  function buildDoc() {
    var html = S.files.html, css = S.files.css, js = S.files.js;
    var usedCss = false, usedJs = false;
    var out = html.replace(LINK_RE, function () { usedCss = true; return styleTag(css); });
    out = out.replace(SCRIPT_RE, function () { usedJs = true; return scriptTag(js); });
    if (!usedCss && css.trim()) {
      usedCss = true;
      if (/<\/head>/i.test(out)) out = out.replace(/<\/head>/i, function (m) { return styleTag(css) + m; });
      else out = styleTag(css) + out;
    }
    if (!usedJs && js.trim()) {
      if (/<\/body>/i.test(out)) out = out.replace(/<\/body>/i, function (m) { return scriptTag(js) + m; });
      else out = out + scriptTag(js);
    }
    cssLive = usedCss;
    var hookTag = '<script>(' + hook.toString() + ')(' + JSON.stringify(scrollPos) + ');<\/script>';
    if (/<head[^>]*>/i.test(out)) return out.replace(/<head[^>]*>/i, function (m) { return m + hookTag; });
    var dt = /^\s*<!doctype[^>]*>/i.exec(out);
    if (dt) return dt[0] + hookTag + out.slice(dt[0].length);
    return hookTag + out;
  }

  function stamp() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
  function flash(text) { statusEl.textContent = text; }

  function postCss() {
    try { front.contentWindow.postMessage({ __pgcss: 1, css: S.files.css }, '*'); } catch (e) {}
  }
  function swap(next) {
    var old = front;
    front = next; back = old;
    front.classList.add('is-front');
    old.classList.remove('is-front');
    old.onload = null;
    old.srcdoc = '<!doctype html><title></title>'; // stops the old page's timers and scripts
    if (cssLive) postCss();
  }

  function runPreview() {
    clearTimeout(timers.full); clearTimeout(timers.css); clearTimeout(timers.guard);
    clearConsole();
    var token = ++runToken, next = back, done = false;
    function ready() {
      if (done || token !== runToken) return;
      done = true;
      next.onload = null;
      swap(next);
    }
    next.onload = ready;
    timers.guard = setTimeout(ready, 2000); // swap anyway if a slow image or font keeps the page from finishing
    next.srcdoc = buildDoc();
    flash('Updated ' + stamp());
  }

  // Called after every edit when Auto-run is on
  function scheduleRun() {
    if (S.active === 'css' && cssLive) {
      clearTimeout(timers.css);
      timers.css = setTimeout(function () { postCss(); flash('Styles updated ' + stamp()); }, 50);
    } else {
      clearTimeout(timers.full);
      timers.full = setTimeout(runPreview, 300);
    }
  }

  /* ---------- Console ---------- */
  var conEl = $('console'), conBody = $('console-body'), conToggle = $('console-toggle'), badge = $('badge');
  var conCount = 0, conErrors = 0;
  function emptyNote() {
    conBody.innerHTML = '';
    var d = document.createElement('div');
    d.className = 'console-empty';
    d.textContent = 'console.log output and errors from your JavaScript appear here.';
    conBody.appendChild(d);
  }
  function clearConsole() {
    conCount = 0; conErrors = 0;
    badge.textContent = '0'; badge.className = 'badge';
    emptyNote();
  }
  function addLine(level, args) {
    if (conCount === 0) conBody.innerHTML = '';
    conCount++;
    if (level === 'error') conErrors++;
    var d = document.createElement('div');
    d.className = 'line ' + (level === 'warn' ? 'warn' : level === 'error' ? 'error' : '');
    d.textContent = args.join(' ');
    conBody.appendChild(d);
    if (conBody.children.length > 300) conBody.removeChild(conBody.firstChild);
    conBody.scrollTop = conBody.scrollHeight;
    badge.textContent = String(conCount);
    badge.className = 'badge' + (conErrors ? ' err' : '');
  }
  function setConsole(open) {
    conEl.hidden = !open;
    conToggle.setAttribute('aria-expanded', String(open));
    S.console = open;
    save();
  }
  conToggle.addEventListener('click', function () { setConsole(conEl.hidden); });
  $('console-hide').addEventListener('click', function () { setConsole(false); });
  $('console-clear').addEventListener('click', clearConsole);

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.__pg === 2) {
      if (e.source === front.contentWindow) scrollPos = [d.x || 0, d.y || 0];
      return;
    }
    if (d.__pg !== 1 || !Array.isArray(d.args)) return;
    if (e.source !== front.contentWindow && e.source !== back.contentWindow) return;
    addLine(String(d.level), d.args.map(String));
  });

  /* ---------- Toolbar ---------- */
  $('run').addEventListener('click', runPreview);
  $('reload').addEventListener('click', runPreview);
  autoEl.addEventListener('change', function () { S.auto = autoEl.checked; save(); if (S.auto) runPreview(); });

  var moreBtn = $('more'), menu = $('menu');
  function setMenu(open) { menu.hidden = !open; moreBtn.setAttribute('aria-expanded', String(open)); }
  moreBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(menu.hidden); });
  document.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  $('copy').addEventListener('click', function () {
    var text = ta.value, name = NAMES[S.active];
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
  function loadAll(files) {
    S.files = { html: files.html, css: files.css, js: files.js };
    ta.value = S.files[S.active];
    render(); save(); runPreview();
  }
  armed($('sample'), 'Replace all code?', function () { setMenu(false); loadAll(SAMPLE); flash('Sample loaded'); });
  armed($('clear'), 'Clear everything?', function () { setMenu(false); loadAll({ html: '', css: '', js: '' }); flash('Cleared'); ta.focus(); });

  /* ---------- Layout, phone frame, preview width ---------- */
  var appEl = $('app');
  var LAYOUTS = { 'cols': ['cols', false], 'cols-rev': ['cols', true], 'rows': ['rows', false], 'rows-rev': ['rows', true] };
  var layoutBtns = Array.prototype.slice.call(document.querySelectorAll('[data-layout]'));
  var viewBtns = Array.prototype.slice.call(document.querySelectorAll('#view-seg [data-view]'));
  var devBtns = Array.prototype.slice.call(document.querySelectorAll('[data-dev]'));
  var phoneBtn = $('phone'), fw = $('fw');

  function clampSplit(v) { return Math.min(80, Math.max(20, v)); }
  function isCompact() { return appEl.hasAttribute('data-compact'); }

  // S.split is the editor's share of the stage, in percent
  function applyTracks() {
    var dir = stage.dataset.dir, rev = stage.dataset.rev === '1';
    var a = S.split, b = 100 - S.split;
    var tracks = rev
      ? 'minmax(0,' + b + 'fr) 10px minmax(0,' + a + 'fr)'
      : 'minmax(0,' + a + 'fr) 10px minmax(0,' + b + 'fr)';
    stage.style.gridTemplateColumns = dir === 'cols' ? tracks : 'minmax(0,1fr)';
    stage.style.gridTemplateRows = dir === 'rows' ? tracks : 'minmax(0,1fr)';
  }
  function applyLayout() {
    var L = LAYOUTS[S.layout] || LAYOUTS.cols;
    var dir = isCompact() ? 'rows' : L[0];
    stage.dataset.dir = dir;
    stage.dataset.rev = L[1] ? '1' : '0';
    resizer.setAttribute('aria-orientation', dir === 'cols' ? 'vertical' : 'horizontal');
    layoutBtns.forEach(function (b) {
      var l = LAYOUTS[b.dataset.layout];
      b.setAttribute('aria-pressed', String(l[0] === dir && l[1] === L[1]));
    });
    applyTracks();
  }
  layoutBtns.forEach(function (b) {
    b.addEventListener('click', function () { S.layout = b.dataset.layout; applyLayout(); save(); });
  });

  function applyView() {
    stage.dataset.view = S.view;
    viewBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.view === S.view)); });
  }
  viewBtns.forEach(function (b) {
    b.addEventListener('click', function () { S.view = b.dataset.view; applyView(); save(); });
  });

  function applyDevice() {
    fw.dataset.device = S.device;
    devBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.dev === S.device)); });
  }
  devBtns.forEach(function (b) { b.addEventListener('click', function () { S.device = b.dataset.dev; applyDevice(); save(); }); });

  function applyPhone() {
    appEl.classList.toggle('phone', !!S.phone);
    document.body.classList.toggle('stage-bg', !!S.phone);
    phoneBtn.setAttribute('aria-pressed', String(!!S.phone));
  }
  phoneBtn.addEventListener('click', function () { S.phone = !S.phone; applyPhone(); checkCompact(); save(); });

  function checkCompact() {
    var c = appEl.clientWidth <= 820;
    if (c !== isCompact()) { appEl.toggleAttribute('data-compact', c); applyLayout(); }
  }
  if (window.ResizeObserver) new ResizeObserver(checkCompact).observe(appEl);
  else window.addEventListener('resize', checkCompact);

  /* ---------- Theme: Auto follows the device, Light and Dark override it ---------- */
  var themeBtns = Array.prototype.slice.call(document.querySelectorAll('[data-theme-set]'));
  function applyTheme() {
    var root = document.documentElement;
    if (S.theme === 'light' || S.theme === 'dark') root.setAttribute('data-theme', S.theme);
    else root.removeAttribute('data-theme');
    themeBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.themeSet === S.theme)); });
  }
  themeBtns.forEach(function (b) {
    b.addEventListener('click', function () { S.theme = b.dataset.themeSet; applyTheme(); save(); });
  });

  /* ---------- Divider (drag or arrow keys) ---------- */
  resizer.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    resizer.setPointerCapture(e.pointerId);
    stage.classList.add('dragging');
    var r = stage.getBoundingClientRect(), bar = resizer.getBoundingClientRect();
    var horizontalBar = bar.width > bar.height, rev = stage.dataset.rev === '1';
    function move(ev) {
      var frac = horizontalBar ? (ev.clientY - r.top) / r.height : (ev.clientX - r.left) / r.width;
      S.split = Math.round(clampSplit((rev ? 1 - frac : frac) * 100) * 10) / 10;
      applyTracks();
    }
    function up() {
      stage.classList.remove('dragging');
      resizer.removeEventListener('pointermove', move);
      resizer.removeEventListener('pointerup', up);
      resizer.removeEventListener('pointercancel', up);
      save();
    }
    resizer.addEventListener('pointermove', move);
    resizer.addEventListener('pointerup', up);
    resizer.addEventListener('pointercancel', up);
  });
  resizer.addEventListener('keydown', function (e) {
    var d = { ArrowLeft: -2, ArrowUp: -2, ArrowRight: 2, ArrowDown: 2 }[e.key];
    if (!d) return;
    e.preventDefault();
    if (stage.dataset.rev === '1') d = -d;
    S.split = clampSplit(S.split + d);
    applyTracks();
    save();
  });

  /* ---------- Boot ---------- */
  autoEl.checked = !!S.auto;
  if (['html', 'css', 'js'].indexOf(S.active) < 0) S.active = 'html';
  if (!LAYOUTS[S.layout]) S.layout = 'cols';
  if (['code', 'both', 'preview'].indexOf(S.view) < 0) S.view = 'both';
  S.split = clampSplit(Number(S.split) || 50);
  tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.id === S.active)); });
  ta.value = S.files[S.active];
  render();
  if (['auto', 'light', 'dark'].indexOf(S.theme) < 0) S.theme = 'auto';
  applyTheme();
  applyPhone();
  appEl.toggleAttribute('data-compact', appEl.clientWidth <= 820);
  applyLayout();
  applyView();
  applyDevice();
  clearConsole();
  setConsole(!!S.console);
  runPreview();
})();
