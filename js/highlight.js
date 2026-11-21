/* highlight.js (editor page)
   Colours the code. Small regular-expression highlighters for HTML, CSS and JavaScript. */

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
