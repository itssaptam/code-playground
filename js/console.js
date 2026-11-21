/* console.js (editor page)
   The console panel under the preview: shows console.log output and errors from your JavaScript. */

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
