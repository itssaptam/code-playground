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
    active: 'html', auto: true, layout: 'cols', split: 50, device: 'fit', phone: false, console: false, view: 'both', theme: 'auto',
    names: { html: 'index.html', css: 'style.css', js: 'script.js' }, project: ''
  };
  try {
    var raw = localStorage.getItem(KEY) || localStorage.getItem('code-playground-v1');
    if (raw) {
      var o = JSON.parse(raw);
      if (o && o.files && typeof o.files.html === 'string' && typeof o.files.css === 'string' && typeof o.files.js === 'string') {
        S.files = o.files;
        ['active', 'auto', 'layout', 'split', 'device', 'phone', 'console', 'view', 'theme'].forEach(function (k) { if (o[k] !== undefined) S[k] = o[k]; });
        if (o.names && typeof o.names.html === 'string' && typeof o.names.css === 'string' && typeof o.names.js === 'string') { S.names = o.names; S.project = typeof o.project === 'string' ? o.project : ''; }
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
    if (project.handle) markDirty(true);
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

  /* ---------- Building the preview page ----------
     The editor holds three files (HTML, CSS, JS). Everything else a folder project needs
     (other CSS or JS files, images, fonts) is read once when the folder is opened and inlined here. */
  var project = { handle: null, assets: {}, texts: {}, mapped: { html: true, css: true, js: true } };

  function normPath(p) {
    var out = [];
    String(p).split('/').forEach(function (s) {
      if (!s || s === '.') return;
      if (s === '..') out.pop(); else out.push(s);
    });
    return out.join('/');
  }
  function dirOf(p) { var i = p.lastIndexOf('/'); return i < 0 ? '' : p.slice(0, i); }
  function baseName(p) { return p.slice(p.lastIndexOf('/') + 1); }
  // Turns a path written in a file into a path from the project root. Returns null for web links, data: URLs and #anchors.
  function resolveRef(base, ref) {
    if (!ref) return null;
    ref = ref.trim();
    if (!ref || /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref)) return null;
    ref = ref.replace(/[?#].*$/, '');
    try { ref = decodeURIComponent(ref); } catch (e) {}
    return normPath(ref.charAt(0) === '/' ? ref : (base ? base + '/' : '') + ref);
  }
  function getAttr(tag, name) {
    var m = new RegExp('\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')', 'i').exec(tag);
    return m ? (m[1] !== undefined ? m[1] : m[2]) : null;
  }
  function fixAttrs(tag, names, base) {
    names.forEach(function (name) {
      tag = tag.replace(new RegExp('(\\b' + name + '\\s*=\\s*)(["\'])(.*?)\\2', 'i'), function (m, pre, q, v) {
        var r = resolveRef(base, v), d = r !== null ? project.assets[r] : null;
        return d ? pre + q + d + q : m;
      });
    });
    return tag;
  }
  function fixCssUrls(css, base) {
    return css.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, function (m, q, u) {
      var r = resolveRef(base, u), d = r !== null ? project.assets[r] : null;
      return d ? 'url(' + d + ')' : m; // unquoted, so it is safe inside style="..." attributes too
    });
  }
  function styleTag(css, live) { return '<style' + (live ? ' id="__pg_css"' : '') + '>' + css.replace(/<\/style/gi, '<\\/style') + '</style>'; }
  function scriptTag(js, attrs) {
    attrs = (attrs || '').replace(/\s*\bsrc\s*=\s*(?:"[^"]*"|'[^']*')/i, '').replace(/\s+(?:defer|async)(?=\s|$)/gi, '');
    return '<script' + attrs + '>' + js.replace(/<\/script/gi, '<\\/script') + '<\/script>';
  }
  function cssForPreview() { return fixCssUrls(S.files.css, dirOf(normPath(S.names.css))); }

  function buildDoc() {
    var html = S.files.html, css = S.files.css, js = S.files.js;
    var base = dirOf(normPath(S.names.html));
    var cssPath = normPath(S.names.css), jsPath = normPath(S.names.js);
    var usedCss = false, usedJs = false, deferred = [];

    var out = html.replace(/<link\b[^>]*>/gi, function (tag) {
      if (!/rel\s*=\s*["']?stylesheet/i.test(tag)) return fixAttrs(tag, ['href'], base);
      var r = resolveRef(base, getAttr(tag, 'href'));
      if (r === null) return tag;
      if (r === cssPath) { if (usedCss) return ''; usedCss = true; return styleTag(cssForPreview(), true); }
      if (project.texts[r] !== undefined) return styleTag(fixCssUrls(project.texts[r], dirOf(r)));
      return tag;
    });

    out = out.replace(/<script\b([^>]*)>\s*<\/script>/gi, function (tag, attrs) {
      var r = resolveRef(base, getAttr(tag, 'src'));
      if (r === null) return tag;
      var code = null;
      if (r === jsPath) { if (usedJs) return ''; usedJs = true; code = js; }
      else if (project.texts[r] !== undefined) code = project.texts[r];
      if (code === null) return tag;
      var tagOut = scriptTag(code, attrs);
      // an inline script cannot be "deferred", so run it at the end of the page instead
      if (/\sdefer(?=\s|$)/i.test(attrs) && !/type\s*=\s*["']?module/i.test(attrs)) { deferred.push(tagOut); return ''; }
      return tagOut;
    });

    out = out.replace(/<(?:img|source|video|audio|track|input|embed)\b[^>]*>/gi, function (tag) {
      return fixAttrs(tag, ['src', 'poster'], base);
    });

    if (!usedCss && css.trim()) {
      usedCss = true;
      if (/<\/head>/i.test(out)) out = out.replace(/<\/head>/i, function (m) { return styleTag(cssForPreview(), true) + m; });
      else out = styleTag(cssForPreview(), true) + out;
    }
    if (!usedJs && js.trim()) deferred.push(scriptTag(js));
    if (deferred.length) {
      var tail = deferred.join('');
      if (/<\/body>/i.test(out)) out = out.replace(/<\/body>/i, function (m) { return tail + m; });
      else out = out + tail;
    }
    out = fixCssUrls(out, base); // style="background: url(...)" written in the HTML itself

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
    try { front.contentWindow.postMessage({ __pgcss: 1, css: cssForPreview() }, '*'); } catch (e) {}
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
  function loadAll(files) {
    S.files = { html: files.html, css: files.css, js: files.js };
    ta.value = S.files[S.active];
    render(); save(); runPreview();
  }
  armed($('sample'), 'Replace all code?', function () { setMenu(false); detachProject(); loadAll(SAMPLE); flash('Sample loaded'); });
  armed($('clear'), 'Clear everything?', function () { setMenu(false); detachProject(); loadAll({ html: '', css: '', js: '' }); flash('Cleared'); ta.focus(); });

  /* ---------- Open a project folder ----------
     Pick a folder that holds index.html, a CSS file and a JS file. The page is found first, then the
     CSS and JS files it links to. Images and fonts are inlined so they show in the preview.
     In Chrome and Edge the folder stays connected, so Save (Ctrl/Cmd + S) writes your edits back to it. */
  var projEl = $('proj'), projName = $('proj-name'), saveBtn = $('save-folder'), folderInput = $('folder-input');
  var IGNORE = /^(node_modules|dist|build|out|coverage|vendor)$/i;
  var MAX_FILES = 3000, MAX_ASSET = 4 * 1024 * 1024, MAX_TOTAL = 40 * 1024 * 1024;
  var MIME = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif',
    svg: 'image/svg+xml', ico: 'image/x-icon', bmp: 'image/bmp',
    woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf',
    mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', mp4: 'video/mp4', webm: 'video/webm'
  };

  function fileLabel(id) { return baseName(S.names[id]); }
  function updateProjectUI() {
    tabs.forEach(function (t) {
      var n = S.names[t.dataset.id];
      t.querySelector('.tn').textContent = baseName(n);
      t.title = n;
    });
    projEl.hidden = !S.project;
    projName.textContent = S.project || '';
    projName.title = S.project ? (project.handle ? S.project : S.project + ' (open the folder again to load images and other files)') : '';
    saveBtn.hidden = !project.handle;
  }
  function markDirty(on) { saveBtn.classList.toggle('dirty', !!on); }
  function detachProject() {
    project.handle = null; project.assets = {}; project.texts = {};
    project.mapped = { html: true, css: true, js: true };
    S.names = { html: 'index.html', css: 'style.css', js: 'script.js' };
    S.project = '';
    markDirty(false);
    updateProjectUI();
  }

  function toDataUrl(file, type) {
    return new Promise(function (resolve) {
      var r = new FileReader();
      r.onload = function () { resolve(r.result); };
      r.onerror = function () { resolve(null); };
      r.readAsDataURL(type ? file.slice(0, file.size, type) : file);
    });
  }
  async function walk(dir, prefix, out, depth) {
    for await (var entry of dir.values()) {
      if (out.length >= MAX_FILES) return;
      if (entry.name.charAt(0) === '.') continue;
      if (entry.kind === 'directory') {
        if (depth < 6 && !IGNORE.test(entry.name)) await walk(entry, prefix + entry.name + '/', out, depth + 1);
      } else {
        out.push({ path: prefix + entry.name, file: await entry.getFile() });
      }
    }
  }
  function byDepth(a, b) { return a.split('/').length - b.split('/').length || a.localeCompare(b); }

  async function openProject(entries, name, handle) {
    flash('Reading ' + name + '...');
    var map = {};
    entries.forEach(function (e) { map[e.path] = e.file; });
    var paths = Object.keys(map).sort(byDepth);
    var htmls = paths.filter(function (p) { return /\.html?$/i.test(p); });
    var htmlPath = htmls.filter(function (p) { return p.toLowerCase() === 'index.html'; })[0] ||
      htmls.filter(function (p) { return /(^|\/)index\.html?$/i.test(p); })[0] || htmls[0];
    if (!htmlPath) { flash('No HTML file found in ' + name); return; }

    var html = await map[htmlPath].text();
    var base = dirOf(htmlPath);
    function refs(tagRe, attr, test) {
      var out = [], m;
      tagRe.lastIndex = 0;
      while ((m = tagRe.exec(html))) {
        if (test && !test.test(m[0])) continue;
        var r = resolveRef(base, getAttr(m[0], attr));
        if (r !== null && map[r] !== undefined) out.push(r);
      }
      return out;
    }
    function pick(list, names) {
      for (var i = 0; i < names.length; i++) {
        var f = list.filter(function (p) { return baseName(p).toLowerCase() === names[i]; })[0];
        if (f) return f;
      }
      return null;
    }
    // Of the files the page links, prefer the usual names, otherwise the first one
    var linkedCss = refs(/<link\b[^>]*>/gi, 'href', /rel\s*=\s*["']?stylesheet/i).filter(function (p) { return /\.css$/i.test(p); });
    var linkedJs = refs(/<script\b[^>]*>/gi, 'src').filter(function (p) { return /\.m?js$/i.test(p); });
    var cssPath = pick(linkedCss, ['style.css', 'styles.css', 'main.css', 'index.css', 'app.css']) || linkedCss[0] ||
      pick(paths, ['style.css', 'styles.css', 'main.css', 'index.css']);
    var jsPath = pick(linkedJs, ['script.js', 'main.js', 'app.js', 'index.js']) || linkedJs[0] ||
      pick(paths, ['script.js', 'main.js', 'app.js', 'index.js']);

    var assets = {}, texts = {}, total = 0, count = 0;
    for (var i = 0; i < paths.length; i++) {
      var p = paths[i], f = map[p];
      if (p === htmlPath || p === cssPath || p === jsPath) continue;
      var m = /\.([a-z0-9]+)$/i.exec(p), ext = m ? m[1].toLowerCase() : '';
      if (ext === 'css' || ext === 'js' || ext === 'mjs') { if (f.size <= 2 * 1024 * 1024) texts[p] = await f.text(); }
      else if (MIME[ext] && f.size <= MAX_ASSET && total + f.size <= MAX_TOTAL) {
        var d = await toDataUrl(f, MIME[ext]);
        if (d) { assets[p] = d; total += f.size; count++; }
      }
    }

    S.files = { html: html, css: cssPath ? await map[cssPath].text() : '', js: jsPath ? await map[jsPath].text() : '' };
    S.names = { html: htmlPath, css: cssPath || 'style.css', js: jsPath || 'script.js' };
    S.project = name;
    S.active = 'html';
    project.handle = handle || null;
    project.assets = assets; project.texts = texts;
    project.mapped = { html: true, css: !!cssPath, js: !!jsPath };
    tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.id === 'html')); });
    ta.value = S.files.html;
    scrollMem = { html: 0, css: 0, js: 0 };
    ta.scrollTop = 0;
    render();
    updateProjectUI();
    markDirty(false);
    save();
    runPreview();
    flash('Opened ' + name + ' (' + (paths.length) + ' files' + (handle ? ', Ctrl/Cmd + S saves' : '') + ')');
  }

  async function openFolder() {
    setMenu(false);
    if (window.showDirectoryPicker) {
      try {
        var dir = await window.showDirectoryPicker({ id: 'ctrlsaptam', mode: 'readwrite' });
        var out = [];
        await walk(dir, '', out, 0);
        await openProject(out, dir.name, dir);
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') return;
        // blocked here (for example inside an embedded page): use the plain folder chooser instead
      }
    }
    folderInput.click();
  }
  folderInput.addEventListener('change', async function () {
    var list = Array.prototype.slice.call(folderInput.files || []);
    folderInput.value = '';
    if (!list.length) return;
    var name = (list[0].webkitRelativePath || '').split('/')[0] || 'Project';
    var entries = [];
    list.forEach(function (f) {
      var parts = (f.webkitRelativePath || f.name).split('/');
      parts.shift();
      var skip = parts.some(function (s, i) { return s.charAt(0) === '.' || (i < parts.length - 1 && IGNORE.test(s)); });
      if (!skip && parts.length && parts.length <= 8 && entries.length < MAX_FILES) entries.push({ path: parts.join('/'), file: f });
    });
    await openProject(entries, name, null);
  });
  $('open-folder').addEventListener('click', openFolder);
  $('open-folder-btn').addEventListener('click', openFolder);

  async function fileHandleFor(root, path) {
    var parts = path.split('/'), d = root;
    for (var i = 0; i < parts.length - 1; i++) d = await d.getDirectoryHandle(parts[i]);
    return d.getFileHandle(parts[parts.length - 1]);
  }
  async function saveProject() {
    if (!project.handle) return;
    var n = 0;
    try {
      for (var id of ['html', 'css', 'js']) {
        if (!project.mapped[id]) continue;
        var w = await (await fileHandleFor(project.handle, S.names[id])).createWritable();
        await w.write(S.files[id]);
        await w.close();
        n++;
      }
      markDirty(false);
      flash('Saved ' + n + (n === 1 ? ' file' : ' files') + ' to ' + S.project + ' at ' + stamp());
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
    appEl.toggleAttribute('data-tight', appEl.clientWidth <= 1000);
    var c = appEl.clientWidth <= 820;
    if (c !== isCompact()) { appEl.toggleAttribute('data-compact', c); applyLayout(); }
  }
  if (window.ResizeObserver) new ResizeObserver(checkCompact).observe(appEl);
  else window.addEventListener('resize', checkCompact);

  /* ---------- Theme: one button cycles Auto (follows the device), Light, Dark ---------- */
  var themeBtn = $('theme');
  var THEMES = ['auto', 'light', 'dark'];
  var THEME_NAMES = { auto: 'follow device', light: 'light', dark: 'dark' };
  function applyTheme() {
    var root = document.documentElement;
    if (S.theme === 'light' || S.theme === 'dark') root.setAttribute('data-theme', S.theme);
    else root.removeAttribute('data-theme');
    themeBtn.dataset.state = S.theme;
    var label = 'Theme: ' + THEME_NAMES[S.theme];
    themeBtn.title = label; themeBtn.setAttribute('aria-label', label);
  }
  themeBtn.addEventListener('click', function () {
    S.theme = THEMES[(THEMES.indexOf(S.theme) + 1) % THEMES.length];
    applyTheme(); save();
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
  updateProjectUI();
  applyPhone();
  appEl.toggleAttribute('data-compact', appEl.clientWidth <= 820);
  appEl.toggleAttribute('data-tight', appEl.clientWidth <= 1000);
  applyLayout();
  applyView();
  applyDevice();
  clearConsole();
  setConsole(!!S.console);
  runPreview();
})();
