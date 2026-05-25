# Christ The King Anglican Church — Website

Next.js site with Keystatic CMS, Resend email, Cloudflare D1, and admin tools.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in secrets
npm run check:config         # see what's missing
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin](http://localhost:3000/admin).

## Third-party services (your setup)

Resend, Cloudflare D1, YouTube, Google Maps, and Keystatic GitHub need API keys and DNS **from you**. Full steps:

**→ [THIRD_PARTY_SETUP.md](./THIRD_PARTY_SETUP.md)**

| Command | Purpose |
|---------|---------|
| `npm run check:config` | Checklist of configured services |
| `npm run test:resend` | Send test email |
| `npm run test:youtube` | Verify YouTube API |
| `npm run db:setup` | Local D1 + migrations |
| `npm run deploy` | Deploy to Cloudflare |

## Admin Panel Authentication

The Keystatic admin panel at `/admin` is protected by a server-side password session.

### Setting up admin access

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and set a secure password:
   ```
   ADMIN_PASSWORD=your-secure-password-here
   ADMIN_SESSION_SECRET=your-long-random-secret
   ```

3. Start or restart the app:
   ```bash
   npm run dev
   ```

### For production deployment

Set both `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in your hosting platform (Vercel, Cloudflare, etc.).

**Important notes:**
- The password is verified on the server and is not embedded in client bundles
- Sessions are stored as signed, HTTP-only cookies
- Sessions expire after 24 hours
- To rotate credentials, update environment variables and restart the app

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
