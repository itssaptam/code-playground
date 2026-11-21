/* editor.js (editor page)
   The code editor: a transparent textarea sits on top of a coloured copy of the code.
   Handles typing, Tab / Enter behaviour, tabs for the three files, and undo/redo scrolling. */

var ta = $('ta'), hl = $('hl'), stage = $('stage');
var statusEl = $('status'), autoEl = $('auto'), resizer = $('resizer');
var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
var scrollMem = { html: 0, css: 0, js: 0 };

/* ---------- Rendering the code ---------- */
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
  touchProject();
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
