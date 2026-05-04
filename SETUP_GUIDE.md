# Phase 1 Setup Guide - What You Need to Get

## 🔑 Required External Services & API Keys

### 1. Resend (Email Service) - FREE TIER
**What it's for**: Sending emails from contact form

**Steps to get API key**:
1. Go to https://resend.com
2. Click "Start Building" or "Sign Up"
3. Sign up with your email or GitHub
4. Once logged in, go to "API Keys" in the dashboard
5. Click "Create API Key"
6. Give it a name like "CTK Website Production"
7. Copy the API key (starts with `re_...`)
8. **IMPORTANT**: Save it immediately - you can't see it again!

**Free Tier**: 3,000 emails/month, 100 emails/day
**Cost if you exceed**: $20/month for 50,000 emails

**What to do with it**: Add to `.env.local`:
```
RESEND_API_KEY=re_your_api_key_here
```

---

### 2. Cloudflare Account (Database & Deployment)
**What it's for**: D1 Database, Pages deployment, R2 storage (future)

**Steps to set up**:
1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with your email
3. Verify your email
4. You'll get a Cloudflare account (FREE)

**What you'll need**:
- Account ID (found in dashboard URL or Workers & Pages section)
- API Token (for deployments)

**To get Account ID**:
1. Log into Cloudflare Dashboard
2. Go to "Workers & Pages"
3. Look at the URL: `https://dash.cloudflare.com/{ACCOUNT_ID}/workers-and-pages`
4. Or find it in the right sidebar under "Account ID"

**To get API Token**:
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Or create custom token with these permissions:
   - Account > Cloudflare Pages > Edit
   - Account > D1 > Edit
   - Account > Workers Scripts > Edit
5. Copy the token (starts with a long string)

**What to do with them**: Add to `.env.local`:
```
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
```

---

### 3. Domain Email Address (for sending FROM)
**What it's for**: Sending emails from your domain (not Gmail)

**Option A - Use Resend's Domain (Quick Start)**:
- You can send from `onboarding@resend.dev` immediately
- Good for testing
- **Limitation**: Emails might go to spam

**Option B - Use Your Own Domain (Recommended for Production)**:
1. Log into Resend dashboard
2. Go to "Domains"
3. Click "Add Domain"
4. Enter your domain: `ctkasa.com`
5. Resend will give you DNS records to add
6. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
7. Add the DNS records (TXT, MX, CNAME)
8. Wait for verification (can take 24-48 hours)
9. Once verified, you can send from `website@ctkasa.com` or `noreply@ctkasa.com`

**What to do with it**: Add to `.env.local`:
```
EMAIL_FROM=website@ctkasa.com
# Or for testing:
EMAIL_FROM=onboarding@resend.dev
```

---

## 📋 Environment Variables Summary

Create or update your `.env.local` file with:

```env
# Existing (you should already have these)
ADMIN_PASSWORD=your_secure_password
ADMIN_SESSION_SECRET=your_long_random_secret

# NEW - Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=website@ctkasa.com
ADMIN_EMAIL=ctkrector@gmail.com

# NEW - Cloudflare (for deployment)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Change to https://ctkasa.com in production
```

---

## 🗄️ Cloudflare D1 Database Setup

### Local Development
The database will be created automatically when you run:
```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Apply migrations locally
```

### Production Setup (After Deployment)
1. Log into Cloudflare Dashboard
2. Go to "Workers & Pages" > "D1"
3. Click "Create Database"
4. Name it: `ctk-website-db`
5. Click "Create"
6. Copy the database ID
7. Update `wrangler.toml` with the database ID (I'll create this file)

---

## 🚀 Quick Start Checklist

- [ ] Sign up for Resend account
- [ ] Get Resend API key
- [ ] Add RESEND_API_KEY to `.env.local`
- [ ] Sign up for Cloudflare account
- [ ] Get Cloudflare Account ID
- [ ] Get Cloudflare API Token
- [ ] Add Cloudflare credentials to `.env.local`
- [ ] Set EMAIL_FROM and ADMIN_EMAIL in `.env.local`
- [ ] Run `npm install` (to install new dependencies)
- [ ] Run `npm run db:generate` (to create database schema)
- [ ] Run `npm run db:migrate` (to set up local database)
- [ ] Run `npm run dev` (to start development server)
- [ ] Test contact form at http://localhost:3000/connect/contact

---

## 💰 Cost Breakdown

### FREE TIER (Recommended for Start)
- **Resend**: 3,000 emails/month - FREE
- **Cloudflare Pages**: Unlimited requests - FREE
- **Cloudflare D1**: 5GB storage, 5M reads/day - FREE
- **Cloudflare R2**: 10GB storage (future) - FREE
- **Total**: $0/month

### If You Exceed Free Tier
- **Resend Pro**: $20/month (50,000 emails)
- **Cloudflare Workers Paid**: $5/month (10M requests)
- **Estimated Total**: $25/month (only if you get LOTS of traffic)

---

## 🆘 Troubleshooting

### "Resend API key not working"
- Make sure it starts with `re_`
- Check you copied the entire key
- Verify it's in `.env.local` not `.env.example`
- Restart your dev server after adding it

### "Cloudflare database not found"
- Make sure you created the D1 database in Cloudflare dashboard
- Check the database name matches in `wrangler.toml`
- For local dev, run `npm run db:migrate` first

### "Emails not sending"
- Check Resend dashboard for error logs
- Verify your domain is verified (if using custom domain)
- Check spam folder
- Try using `onboarding@resend.dev` for testing first

### "Environment variables not loading"
- Restart your dev server (`npm run dev`)
- Make sure file is named `.env.local` not `.env`
- Check for typos in variable names
- Don't commit `.env.local` to git (it's in .gitignore)

---

## 📞 Support Resources

- **Resend Docs**: https://resend.com/docs
- **Cloudflare D1 Docs**: https://developers.cloudflare.com/d1/
- **Drizzle ORM Docs**: https://orm.drizzle.team/
- **Next.js API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## ⏭️ Next Steps After Setup

Once you have all the API keys and environment variables set up:

1. I'll create the database schema
2. I'll build the contact form API endpoint
3. I'll integrate email sending
4. I'll create an admin dashboard to view submissions
5. We'll test everything locally
6. We'll deploy to Cloudflare Pages

**Estimated time**: 30 minutes to get all API keys, then the code is ready to go!
