# CtrlSaptam

A live HTML / CSS / JavaScript editor with a project dashboard. Everything runs in the browser.

## Open it
Double-click `dashboard.html` (or `index.html`, it redirects).
Use **Chrome or Edge**. For the most reliable experience (Firefox, or saving to folders), run a tiny local server instead:
VS Code "Live Server", or `python -m http.server` in this folder and open http://localhost:8000.

## Folder structure

```
dashboard.html     Home page: all projects with live thumbnails
editor.html        The editor (opened as editor.html#<project id>)
index.html         Redirects to dashboard.html
assets/            favicon.svg, favicon.png, apple-touch-icon.png
css/
  base.css         colours (light + dark), fonts, page background
  components.css   buttons, switch, segmented buttons, menu
  header.css       top bar and its narrow-screen modes
  layout.css       phone frame, panes, divider, Code/Both/Preview
  editor.css       tabs, code editor, syntax colours, folder controls
  preview.css      preview bar, preview frames, console
  dashboard.css    dashboard cards, search, storage strip
js/
  settings.js      UI preferences (localStorage)
  shell.js         helpers, theme button, phone frame, narrow-screen modes
  store.js         IndexedDB database wrapper
  templates.js     sample project + blank starter
  projects.js      create / rename / duplicate / delete projects
  hooks.js         small scripts injected into the previewed page
  builder.js       turns a project into one runnable page
  folder-import.js open a project folder
  storage.js       storage usage, keep-safe request, backup / restore   (dashboard)
  dashboard.js     project cards and thumbnails                         (dashboard)
  dashboard-page.js starts the dashboard
  highlight.js     syntax colouring                                     (editor)
  editor-state.js  the open project and saving it to the database       (editor)
  editor.js        the code editor itself                               (editor)
  preview.js       live preview                                         (editor)
  console.js       console panel                                        (editor)
  layout.js        pane layout and divider                              (editor)
  toolbar.js       Run, Auto-run, More menu                             (editor)
  folder-save.js   save back to a connected folder (Ctrl/Cmd + S)       (editor)
  editor-page.js   starts the editor
```

## Where is my data?
- Projects are stored in your browser's **IndexedDB** (database `ctrlsaptam`) on this computer. They are not uploaded anywhere.
- UI settings (theme, layout...) are in localStorage under `ctrlsaptam-v1`.
- Data belongs to one browser and one address. `file://`, `localhost:8000` and another browser each have their own projects.
- It stays until you delete a project or clear this site's data. Private windows lose everything on close.
- The dashboard shows how much space projects use. **Keep my projects safe** asks the browser not to clear them automatically.
- **Backup** downloads all projects as one `.json` file, **Restore** loads it back. Do this now and then.
- Projects opened from a folder (Chrome/Edge) can also be saved back into the real folder with Ctrl/Cmd + S.
