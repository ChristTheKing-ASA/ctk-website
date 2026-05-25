# Third-party setup guide

Everything below is configured **by you** in external dashboards. The site code is ready — you add keys to `.env.local` (development) and Cloudflare (production).

**Check status anytime:**

```bash
npm run check:config    # terminal checklist
```

**Admin UI:** log in at `/admin` → **Third-party setup checklist**

---

## 1. Admin password {#admin}

**Powers:** `/admin`, `/keystatic`, submission APIs

1. Copy `.env.example` → `.env.local` if you have not already.
2. Set strong values:

```env
ADMIN_PASSWORD=your-secure-password
ADMIN_SESSION_SECRET=random-string-at-least-32-chars
```

3. Restart dev server: `npm run dev`
4. Open http://localhost:3000/admin

**Production:** set the same variables in Cloudflare Workers → Settings → Variables.

---

## 2. Resend (email) {#resend}

**Powers:** Contact form, prayer notifications, auto-replies

### A. API key

1. Sign up: https://resend.com
2. **API Keys** → Create → copy key (`re_...`)
3. In `.env.local`:

```env
RESEND_API_KEY=re_your_real_key
EMAIL_FROM=website@ctkasa.com
ADMIN_EMAIL=thusberg@bellsouth.net
```

4. Test:

```bash
npm run test:resend
```

### B. Verify domain (required for production)

Until `ctkasa.com` is verified, Resend only sends to your account email in test mode.

1. https://resend.com/domains → **Add domain** → `ctkasa.com`
2. Add DNS records at your domain host (TXT, MX, DKIM — Resend shows exact values)
3. Wait for **Verified** status
4. Run `npm run test:resend` again — should deliver to `ADMIN_EMAIL`

**Production:** add `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_EMAIL` in Cloudflare.

---

## 3. Cloudflare D1 (database) {#d1}

**Powers:** Contact submissions, prayer requests, newsletter subscribers in admin

### Local development

```bash
npm run db:setup
```

This creates local D1, applies migrations, and tries to create a remote database (if you are logged into Wrangler).

### Production

1. https://dash.cloudflare.com → **Workers & Pages** → **D1**
2. Create database: `ctk-website-db`
3. Copy **Database ID** into `wrangler.jsonc` and `wrangler.toml` (both `database_id` fields), or run `npm run db:setup` after `npx wrangler login` to auto-fill.

4. Migrate production:

```bash
npm run db:migrate:remote
```

5. Deploy env vars (see §7).

### Wrangler login (optional)

```bash
npx wrangler login
```

Or set in `.env.local`:

```env
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
```

---

## 4. YouTube (sermons) {#youtube}

**Powers:** Latest sermon embed on `/worship/sermons` and homepage

1. https://console.cloud.google.com → create/select project
2. **APIs & Services** → **Library** → enable **YouTube Data API v3**
3. **Credentials** → **Create credentials** → **API key**
4. Restrict key (recommended): YouTube Data API v3 only
5. `.env.local`:

```env
YOUTUBE_API_KEY=your_key
YOUTUBE_CHANNEL_ID=UC3qXOkET13YuCc4dNr89Q2w
```

6. Test:

```bash
npm run test:youtube
```

**Production:** set `YOUTUBE_API_KEY` in Cloudflare (channel ID is already in code / optional env).

---

## 5. Keystatic GitHub (CMS in production) {#keystatic}

**Powers:** Edit content in production; saves commit to GitHub

**Local dev:** works without this (reads/writes JSON in `src/content/`).

### GitHub OAuth app

1. https://github.com/settings/developers → **New OAuth App**
2. **Application name:** CTK Website CMS
3. **Homepage URL:** `https://ctkasa.com` (or your staging URL)
4. **Callback URL:** `https://ctkasa.com/api/keystatic/github/oauth/callback`
5. Copy **Client ID** and **Client Secret**
6. Generate a random `KEYSTATIC_SECRET` (32+ chars)

```env
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
```

7. Deploy the same three variables to Cloudflare.

---

## 6. Google Maps (embed) {#maps}

**Powers:** Map on `/visit` and `/connect/contact`

Without a key, visitors still get an **Open in Google Maps** link.

1. Same Google Cloud project as YouTube (or new project)
2. Enable **Maps Embed API**
3. **Credentials** → API key → restrict to Maps Embed API
4. `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

**Production:** set in Cloudflare (public variable is OK for embed keys if HTTP-referrer restricted).

**Billing:** Google requires a billing account on the project; embed has a free monthly quota.

---

## 7. Production deploy (Cloudflare) {#production}

**Powers:** Live site at ctkasa.com

### Build & deploy

```bash
npx wrangler login   # once
npm run deploy
```

### Environment variables (Cloudflare dashboard)

Set for the `ctk-website` worker:

| Variable | Required |
|----------|----------|
| `ADMIN_PASSWORD` | Yes |
| `ADMIN_SESSION_SECRET` | Yes |
| `RESEND_API_KEY` | Yes |
| `EMAIL_FROM` | Yes (after domain verified) |
| `ADMIN_EMAIL` | Yes |
| `NEXT_PUBLIC_SITE_URL` | Yes (`https://ctkasa.com`) |
| `YOUTUBE_API_KEY` | Recommended |
| `KEYSTATIC_GITHUB_*` + `KEYSTATIC_SECRET` | For production CMS |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optional |

D1 binding `DB` is configured in `wrangler.toml` — no env var needed once `database_id` is set.

### Custom domain

Cloudflare Workers → your worker → **Domains** → add `ctkasa.com` and `www.ctkasa.com`.

---

## Quick test matrix

| Feature | Test command / URL |
|---------|------------------|
| Config overview | `npm run check:config` |
| Email | `npm run test:resend` |
| YouTube | `npm run test:youtube` |
| Admin | `/admin` login |
| Contact + DB | Submit `/connect/contact` (with D1 setup) |
| Newsletter | Footer signup |
| Prayer | `/connect/prayer` |
| Maps | `/visit` (with Maps API key) |
| CMS | `/keystatic` |

---

## What you do not need third parties for

- Static pages, beliefs, team (CMS JSON or Keystatic local)
- Giving links (Kindrid URLs in church info)
- Social links (URLs in church info)
