# Deployment — auto-deploy on push to `main`

Pipeline: GitHub Actions builds the site (`pnpm build`) and `rsync`s the static
`dist/` to the VPS over SSH. VPS only serves files via Caddy — no Node needed
there.

- Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- Trigger: every push to `main` (and manual "Run workflow")
- Live: https://hafizh.web.id · VPS `43.157.213.34`

---

## One-time setup

Do these once. Steps 1–3 run **on the VPS** (SSH in as a sudo user). Step 4 is
on your machine. Step 5 is in the GitHub repo settings.

### 1. Create a dedicated deploy user on the VPS

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
```

### 2. Pick the web root and give `deploy` ownership

Use a dedicated directory for the site (recommended):

```bash
sudo mkdir -p /var/www/hafizh.web.id
sudo chown -R deploy:deploy /var/www/hafizh.web.id
sudo chmod 755 /var/www /var/www/hafizh.web.id
```

> If Caddy already serves the site from another path, either reuse that path
> (chown it to `deploy`) or point Caddy at this new one in step 3.
> Find the current root with: `sudo cat /etc/caddy/Caddyfile`.

This path is what you put in the `DEPLOY_PATH` secret (step 5).

### 3. Configure Caddy for clean URLs

The build emits `index.html`, `case-studies/<slug>.html`, and hashed assets.
Edit `/etc/caddy/Caddyfile` so the site block reads:

```caddy
hafizh.web.id {
    root * /var/www/hafizh.web.id
    encode zstd gzip

    # /case-studies/foo -> case-studies/foo.html ; SPA fallback last
    try_files {path} {path}/index.html {path}.html /index.html

    # Long-cache fingerprinted assets, never cache HTML
    @assets path /assets/*
    header @assets Cache-Control "public, max-age=31536000, immutable"
    @html path *.html /
    header @html Cache-Control "no-cache"

    file_server
}
```

Reload Caddy:

```bash
sudo systemctl reload caddy
# or: sudo caddy reload --config /etc/caddy/Caddyfile
```

Caddy runs as the `caddy` user — it only needs read access; `755` dirs from
step 2 cover that.

### 4. Generate a deploy SSH keypair (on your machine)

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./deploy_key -N ""
```

This makes `deploy_key` (private) and `deploy_key.pub` (public). **Do not
commit these.**

Install the public key on the VPS (run on the VPS, or paste via your sudo user):

```bash
# contents of deploy_key.pub go here:
echo "ssh-ed25519 AAAA...github-actions-deploy" | sudo tee -a /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
```

Test from your machine:

```bash
ssh -i ./deploy_key deploy@43.157.213.34 'echo ok && ls -la /var/www/hafizh.web.id'
```

### 5. Add GitHub repository secrets

Repo → **Settings → Secrets and variables → Actions → New repository secret**.
Create:

| Secret | Value |
|---|---|
| `SSH_HOST` | `43.157.213.34` |
| `SSH_USER` | `deploy` |
| `SSH_PORT` | `22` (or your custom SSH port) |
| `DEPLOY_PATH` | `/var/www/hafizh.web.id` (the path from step 2, no trailing slash) |
| `SSH_KEY` | the **entire** contents of the private `deploy_key` file (including the BEGIN/END lines) |

Then delete the local `deploy_key` / `deploy_key.pub` from your machine.

---

## Using it

- Push to `main` → Actions runs typecheck + tests + build, then rsyncs to the
  VPS. Caddy serves the new files immediately (no restart needed).
- Manual run: repo → **Actions → Deploy → Run workflow**.
- `rsync --delete` keeps the web root an exact mirror of `dist/` — make sure
  `DEPLOY_PATH` points only at the site root and nothing else lives there.

## Rollback

```bash
# On the VPS — list recent deploy commits, then on GitHub:
# Actions -> Deploy -> pick a previous successful run -> "Re-run all jobs"
```

Re-running an older successful workflow rebuilds that commit and re-syncs it.

## Notes / gotchas

- `pnpm test` and `pnpm typecheck` gate the deploy — a red build does **not**
  ship.
- `VITE_SITE_URL=https://hafizh.web.id` is set in the workflow so canonical
  URLs, OG tags, and `sitemap.xml` are correct in production.
- Analytics is off until you add a `VITE_GA_ID` secret and reference it in the
  Build step's `env:` (left out intentionally for now).
- First deploy: confirm `https://hafizh.web.id` and one case study
  (e.g. `https://hafizh.web.id/case-studies/unified-ops-data-platform`) both
  load — that verifies the Caddy `try_files` rule.
