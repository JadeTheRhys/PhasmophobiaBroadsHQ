# PhasmophobiaBroadsHQ (local copy)

This is the local `PhasDONE` folder prepared for GitHub Pages deployment.

What I added/changed:
- CI: `.github/workflows/deploy-pages.yml` — deploys site files to GitHub Pages on push to `main`.
- Lint & format: `.github/workflows/lint.yml` and `.github/workflows/format.yml` run ESLint and Prettier on PRs.
- Dev tooling: `package.json`, `.eslintrc.js`, `.prettierrc`, and `.gitignore` so you can run `npm ci` and checks locally.
- Fixed `index.html` so paths are relative (`js/main.js`, `assets/...`) which is required for GitHub Pages.

How to push these changes to GitHub (power shell):

```powershell
cd C:\Users\Administrator\Desktop\PhasDONE
# If this folder is not a git repo yet:
git init
git remote add origin https://github.com/JadeTheRhys/PhasmophobiaBroadsHQ.git

git checkout -b fix/pages-and-ci
git add .
git commit -m "chore(site): prepare for Pages deploy + add CI (ESLint/Prettier)"
git push -u origin fix/pages-and-ci
```

Then create a Pull Request on GitHub and merge to `main`. After merge, the Pages deploy action will run and publish the site.

If you want, I can produce a patch file instead of pushing; or I can walk you through the push interactively.