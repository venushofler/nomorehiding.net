# Deployment Guide — nomorehiding.net

This is a static site deployed to **GreenGeeks** over FTP by **GitHub Actions**.
There are two environments, both on the same GreenGeeks cPanel account but in
different document roots.

| Environment | URL | How it deploys | Workflow | Live docroot | FTP account |
|---|---|---|---|---|---|
| **Staging** | `staging.nomorehiding.net` | **Automatic** on every push to `main` | `.github/workflows/deploy.yml` | `public_html/staging.nomorehiding.net` | `staging@nomorehiding.net` |
| **Production (Live)** | `nomorehiding.net` | **Manual** (button + typed confirmation) | `.github/workflows/deploy-production.yml` | `public_html` | `deploy@nomorehiding.net` |

> **The live site serves from `public_html`** (nomorehiding.net is the primary domain).
> It does **not** serve from a `public_html/nomorehiding.net` subfolder — deploying there
> publishes a site nobody sees at the apex.

---

## How changes reach the live site

```
feature branch ──PR──► main ──(auto)──► STAGING ──verify──► run manual workflow ──► PRODUCTION (live)
```

1. Do work on a feature branch, open a PR, and merge it into `main`.
2. Merging to `main` **auto-deploys to staging**. Check `staging.nomorehiding.net`.
3. When staging looks good, **manually** run the production workflow (below).
   It publishes whatever is currently on `main` to the live site.

> The production deploy always publishes the **current `main`**. Make sure `main`
> is merged and verified on staging *before* you promote to production.

---

## Running the production deploy

1. GitHub → **Actions** tab → **"Deploy to Production (manual)"**.
2. Click **Run workflow**.
3. In the **confirm** box type `DEPLOY` exactly (any other value aborts the run).
4. Click **Run workflow**. It checks out `main` and FTPs it to the live docroot.

The job refuses to run if the confirmation text isn't `DEPLOY`.

---

## GitHub Actions secrets

Set under **Settings → Secrets and variables → Actions**.
**Passwords live only here and in cPanel — never in the repo.**

| Secret | Used by | Value |
|---|---|---|
| `FTP_SERVER` | staging | GreenGeeks FTP host (`ftp.nomorehiding.net`) |
| `FTP_USERNAME` | staging | `staging@nomorehiding.net` |
| `FTP_PASSWORD` | staging | staging account password |
| `FTP_SERVER_PROD` | production | `ftp.nomorehiding.net` |
| `FTP_USERNAME_PROD` | production | `deploy@nomorehiding.net` |
| `FTP_PASSWORD_PROD` | production | deploy account password |

---

## FTP accounts and `server-dir` (important)

A cPanel FTP account is **jailed to its directory** — a deploy can only write at or
below the account's home. The workflow's `server-dir` is relative to that home. The two
together must resolve to the right docroot.

| Account | Account home (jail) | Workflow `server-dir` | Writes to |
|---|---|---|---|
| `staging@nomorehiding.net` | `public_html/staging.nomorehiding.net` | `/` | the staging docroot |
| `deploy@nomorehiding.net` | `/home/<user>` (account home) | `/public_html/` | `public_html` (live docroot) |

- **Full FTP username is `<prefix>@nomorehiding.net`.** In cPanel's *Add FTP Account*
  form the **Log In** box takes only the prefix (e.g. `deploy`); the `@nomorehiding.net`
  comes from the **Domain** dropdown. The `@` belongs in the GitHub secret value.
- **Directory field gotcha:** cPanel auto-fills **Directory** to
  `public_html/<domain>/<prefix>` (a new subfolder named after the account). Clearing it
  entirely scopes the account to the **account home** instead. Set it deliberately to the
  folder you actually want.

### Recommended tightening (optional)

`deploy@` is currently scoped to the whole account home, so the workflow reaches the live
root via `server-dir: /public_html/`. For a smaller blast radius, recreate `deploy@` with
**Directory = `public_html`** and change the production workflow back to `server-dir: /`.
Same result, but the account can then only touch the live docroot.

---

## Behavior & safety notes

- **Deploys sync changed files; they do not delete** files you remove from the repo
  (no `dangerous-clean-slate`). After renaming/removing files, tidy leftovers on the
  server via FTP / cPanel File Manager if needed.
- **Excluded from every deploy:** `.git*`, `node_modules`, `sftp.json`, `README.md`.
- **Never commit `sftp.json`** — it holds a cleartext FTP password and is gitignored.
  If it was ever staged, run `git restore --staged sftp.json` before committing.
- A `.ftp-deploy-sync-state.json` file is written at each deploy's target root by the
  action — leave it in place (it tracks what's already uploaded).
- **Extra production guardrail (optional):** the production workflow references an
  `environment: production`. Create it under **Settings → Environments** and add a
  **required reviewer** to force manual approval before each live deploy.

---

## Rollback

1. `git revert` the bad commit(s) on `main` (or reset `main` to the last good commit) and
   push — this re-deploys the corrected `main` to **staging**.
2. Verify staging.
3. Run **Deploy to Production (manual)** again to push the corrected `main` live.

---

## Action details (reference)

Both workflows use [`SamKirkland/FTP-Deploy-Action@v4.3.5`](https://github.com/SamKirkland/FTP-Deploy-Action).

- **`deploy.yml`** — `on: push: branches: [main]`; `server-dir: /`; staging secrets.
- **`deploy-production.yml`** — `on: workflow_dispatch` with a required `confirm` input
  (`DEPLOY`); checks out `main`; `server-dir: /public_html/`; `*_PROD` secrets.
