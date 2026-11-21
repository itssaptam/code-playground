/* store.js (both pages)
   Every project lives in the browser's IndexedDB (database "ctrlsaptam"). Two stores:
   "projects" holds the name and the three files, "blobs" holds the heavy parts of a folder project
   (images, extra files, the folder link). If IndexedDB is blocked (a private window), it falls back to memory. */

var Store = (function () {
  var dbp = null, ok = true, mem = { projects: {}, blobs: {} };
  function open() {
    if (!dbp) {
      dbp = new Promise(function (resolve, reject) {
        try {
          var r = indexedDB.open('ctrlsaptam', 1);
          r.onupgradeneeded = function () {
            r.result.createObjectStore('projects', { keyPath: 'id' });
            r.result.createObjectStore('blobs', { keyPath: 'id' });
          };
          r.onsuccess = function () { resolve(r.result); };
          r.onerror = function () { reject(r.error); };
          r.onblocked = function () { reject(new Error('blocked')); };
        } catch (e) { reject(e); }
      }).catch(function () { ok = false; return null; });
    }
    return dbp;
  }
  function withDb(useDb, useMem) { return open().then(function (db) { return db ? useDb(db) : useMem(); }); }
  function tx(db, store, mode, fn) {
    return new Promise(function (resolve, reject) {
      var t = db.transaction(store, mode), r = fn(t.objectStore(store));
      t.oncomplete = function () { resolve(r ? r.result : undefined); };
      t.onerror = t.onabort = function () { reject(t.error || new Error('Storage failed')); };
    });
  }
  return {
    persistent: function () { return ok; },
    ready: function () { return open(); },
    allBlobs: function () {
      return withDb(function (db) { return tx(db, 'blobs', 'readonly', function (s) { return s.getAll(); }); },
        function () { return Object.keys(mem.blobs).map(function (k) { return mem.blobs[k]; }); });
    },
    all: function () {
      return withDb(function (db) { return tx(db, 'projects', 'readonly', function (s) { return s.getAll(); }); },
        function () { return Object.keys(mem.projects).map(function (k) { return mem.projects[k]; }); });
    },
    get: function (store, id) {
      return withDb(function (db) { return tx(db, store, 'readonly', function (s) { return s.get(id); }); },
        function () { return mem[store][id]; }).then(function (r) { return r || null; });
    },
    put: function (store, val) {
      return withDb(function (db) { return tx(db, store, 'readwrite', function (s) { return s.put(val); }); },
        function () { mem[store][val.id] = val; });
    },
    del: function (id) {
      return withDb(function (db) {
        return new Promise(function (resolve, reject) {
          var t = db.transaction(['projects', 'blobs'], 'readwrite');
          t.objectStore('projects').delete(id);
          t.objectStore('blobs').delete(id);
          t.oncomplete = function () { resolve(); };
          t.onerror = t.onabort = function () { reject(t.error || new Error('Storage failed')); };
        });
      }, function () { delete mem.projects[id]; delete mem.blobs[id]; });
    }
  };
})();
