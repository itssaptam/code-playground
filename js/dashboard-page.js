/* dashboard-page.js (dashboard page)
   Starts the dashboard. The very first time, it adds the sample project (and the code of the older
   single-project version, if the browser has it). */

async function seedProjects() {
  var now = Date.now();
  await Store.put('projects', { id: uid(), name: 'Neumorphic Sign Up', folder: false, created: now - 1000, updated: now - 1000, files: cloneFiles(SAMPLE), names: defaultNames() });
  if (legacy && (legacy.files.html !== SAMPLE.html || legacy.files.css !== SAMPLE.css || legacy.files.js !== SAMPLE.js)) {
    await Store.put('projects', { id: uid(), name: legacy.name || 'My project', folder: false, created: now, updated: now, files: cloneFiles(legacy.files), names: legacy.names || defaultNames() });
  }
}

(async function () {
  shellInit();
  try {
    var list = await Store.all();
    if (!list.length) await seedProjects();
  } catch (e) {}
  await renderDashboard();
})();
