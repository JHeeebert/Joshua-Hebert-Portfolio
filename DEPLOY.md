# Deploy this site (GitHub + Vercel) — ~15 minutes

You only do steps 1–4 once. After that, every `git push` auto-deploys.

## 0. One cleanup first
A partial `.git` folder may exist inside `portfolio-site/` from setup. Delete it so you start clean:

- Windows Explorer: turn on "Hidden items," delete the `.git` folder inside `portfolio-site`.
- Or PowerShell from inside `portfolio-site`: `Remove-Item -Recurse -Force .git`

## 1. Confirm it builds locally
Open a terminal in `portfolio-site/`:

```bash
npm install
npm run build      # should output a dist/ folder with no errors
npm run dev        # open http://localhost:5173 and click through every section
```

If `npm run build` errors with a Rollup "Cannot find module" message, run:
`rm -rf node_modules package-lock.json && npm install` then build again.

## 2. Put it on GitHub
Create a new **empty** repo at https://github.com/new — name it `joshua-hebert-portfolio`, no README/gitignore (this repo already has them).

Then from inside `portfolio-site/`:

```bash
git init
git add -A
git commit -m "Senior TPM / Delivery Systems portfolio"
git branch -M main
git remote add origin https://github.com/JHeeebert/joshua-hebert-portfolio.git
git push -u origin main
```

## 3. Connect Vercel
1. Go to https://vercel.com and sign in with GitHub.
2. **Add New → Project** → import `joshua-hebert-portfolio`.
3. Vercel auto-detects Vite. Confirm:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. ~60 seconds later you have a live URL like `joshua-hebert-portfolio.vercel.app`.

The included `vercel.json` handles SPA routing — no extra config needed.

## 4. Custom domain (optional but worth it)
A real domain reads more senior than a `.vercel.app` URL.
1. Buy `joshuahebert.dev` (or `.com`) — ~$12/yr at Namecheap/Cloudflare.
2. In Vercel: Project → **Settings → Domains** → add it, follow the DNS instructions.

## 5. Put the link everywhere
- LinkedIn → Contact info → Website
- Resume header
- Email signature
- The "Connect" buttons already point to your LinkedIn.

## Updating later
Edit content in `src/data/`, then:
```bash
git add -A && git commit -m "update copy" && git push
```
Vercel redeploys automatically in under a minute.
```
