/* preview.js (editor page)
   The live preview. Two stacked iframes: a new version loads in the hidden one and is swapped in
   when ready. CSS edits skip the reload completely. */

/* ---------- Preview ----------
   Two stacked iframes. A new version of the page loads in the hidden one and is swapped in
   once it is ready, so the preview never flashes. CSS edits skip the reload completely. */
var frameA = $('frame-a'), frameB = $('frame-b');
var front = frameA, back = frameB;
front.classList.add('is-front');
var cssLive = false, runToken = 0, timers = {};


function cssForPreview() { return fixCssUrls(S.files.css, dirOf(normPath(S.names.css)), project.assets); }


function buildDoc() {
  var doc = buildDocFor({ files: S.files, names: S.names, assets: project.assets, texts: project.texts });
  cssLive = buildInfo.usedCss;
  return doc;
}


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
