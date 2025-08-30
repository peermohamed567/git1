Student Portfolio – Data Science & Computer Science
===================================================

A responsive, accessible, single-page portfolio site tailored for a DS/CS student.

Quickstart
----------

1) Open locally

- Option A: double-click `index.html` in your file browser
- Option B: serve locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Customize
---------

- Edit your name, bio, and links in `index.html` (search for "Your Name").
- Update skills in the Skills section chips.
- Replace Projects with your own. Set `data-tags` and update links.
- Swap the avatar in `assets/img/avatar.svg` (or use a PNG/JPG).
- Theme: light/dark toggle persists in localStorage. Colors in `assets/css/style.css`.

Deploy
------

GitHub Pages

```bash
git init
git add .
git commit -m "Add DS/CS portfolio"
git branch -M main
git remote add origin git@github.com:YOUR_HANDLE/portfolio.git
git push -u origin main
```

Then enable Pages from the repository settings (deploy from `main` root).

Netlify

- Drag-and-drop the folder on the Netlify dashboard, or
- Use the CLI to deploy the directory with `index.html` at the root.

Structure
---------

```
/ (project root)
├─ index.html
├─ assets/
│  ├─ css/style.css
│  ├─ js/main.js
│  └─ img/avatar.svg
└─ README.md
```

License
-------

MIT

