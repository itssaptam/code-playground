/* layout.js (editor page)
   Where the panes go: side by side or stacked (either order), Code / Both / Preview, the preview width,
   and the draggable divider. The phone frame and compact mode are in shell.js. */

var LAYOUTS = { 'cols': ['cols', false], 'cols-rev': ['cols', true], 'rows': ['rows', false], 'rows-rev': ['rows', true] };
var layoutBtns = Array.prototype.slice.call(document.querySelectorAll('[data-layout]'));
var viewBtns = Array.prototype.slice.call(document.querySelectorAll('#view-seg [data-view]'));
var devBtns = Array.prototype.slice.call(document.querySelectorAll('[data-dev]'));
var fw = $('fw');

function clampSplit(v) { return Math.min(80, Math.max(20, v)); }

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


/* Divider between the panes (drag it, or use the arrow keys) */
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
