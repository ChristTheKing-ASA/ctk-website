# ✅ Phase 1 Complete Setup Checklist

## 🎯 Goal
Get the contact form working with custom backend, email notifications, and database storage.

---

## 📦 What's Already Done (By Me)

✅ Created database schema (`src/db/schema.ts`)  
✅ Created database connection (`src/db/index.ts`)  
✅ Created email service (`src/lib/email.ts`)  
✅ Created contact API endpoint (`src/app/api/contact/route.ts`)  
✅ Updated ContactForm component to use new API  
✅ Created admin dashboard (`src/app/admin/submissions/page.tsx`)  
✅ Added all dependencies to `package.json`  
✅ Created database migration file  
✅ Created Drizzle config  
✅ Created Wrangler config  
✅ Updated `.env.example`  
✅ Created setup script  
✅ Created documentation  

---

## 🚀 What YOU Need to Do (Step-by-Step)

### STEP 1: Install Dependencies (5 minutes)

```bash
npm install
```

**Expected Output**: Should install all packages without errors

**Troubleshooting**:
- If you get errors, try: `rm -rf node_modules package-lock.json && npm install`
- Make sure you're using Node.js 18 or higher: `node --version`

---

### STEP 2: Get Resend API Key (5 minutes)

1. **Go to**: https://resend.com
2. **Click**: "Start Building" or "Sign Up"
3. **Sign up** with your email or GitHub
4. **Verify** your email
5. **Go to**: "API Keys" in the left sidebar
6. **Click**: "Create API Key"
7. **Name it**: "CTK Website Development"
8. **Copy** the key (starts with `re_...`)
9. **IMPORTANT**: Save it immediately - you can't see it again!

**What you'll get**: Something like `re_123abc456def789ghi`

---

### STEP 3: Get Cloudflare Account (5 minutes)

1. **Go to**: https://dash.cloudflare.com/sign-up
2. **Sign up** with your email
3. **Verify** your email
4. **Log in** to dashboard

#### Get Account ID:
1. In dashboard, click "Workers & Pages" in left sidebar
2. Look at the URL: `https://dash.cloudflare.com/{YOUR_ACCOUNT_ID}/workers-and-pages`
3. Copy the account ID (long string of letters/numbers)

**OR**

1. Click your profile icon (top right)
2. Account ID is shown in the dropdown

**What you'll get**: Something like `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

#### Get API Token:
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Click "Use template" next to "Edit Cloudflare Workers"
4. Scroll down and click "Continue to summary"
5. Click "Create Token"
6. **Copy** the token (long string)
7. **IMPORTANT**: Save it immediately!

**What you'll get**: Something like `abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

---

### STEP 4: Create Environment File (2 minutes)

```bash
# Copy the example file
cp .env.example .env.local
```

Now **edit** `.env.local` and fill in these values:

```env
# Admin authentication (you should already have these)
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_SESSION_SECRET=a-very-long-random-string-at-least-32-characters-long

# NEW - Email Service
RESEND_API_KEY=re_your_actual_key_from_step_2
EMAIL_FROM=onboarding@resend.dev
ADMIN_EMAIL=ctkrector@gmail.com

# NEW - Cloudflare
CLOUDFLARE_ACCOUNT_ID=your_account_id_from_step_3
CLOUDFLARE_API_TOKEN=your_api_token_from_step_3

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**IMPORTANT NOTES**:
- For `EMAIL_FROM`, use `onboarding@resend.dev` for now (works immediately)
- Later you can verify your domain and use `website@ctkasa.com`
- Change `ADMIN_EMAIL` to the email where you want to receive contact form notifications
- Generate `ADMIN_SESSION_SECRET` with: `openssl rand -base64 32`

---

### STEP 5: Set Up Local Database (3 minutes)

```bash
# Generate database migrations
npm run db:generate

# Create local D1 database
npx wrangler d1 create ctk-website-db --local

# Apply migrations to local database
npm run db:migrate
```

**Expected Output**:
```
✅ Successfully created DB 'ctk-website-db'
✅ Migrations applied successfully
```

**Troubleshooting**:
- If `wrangler` command not found: `npm install -g wrangler`
- If database already exists: That's OK, continue
- If migration fails: Check that `drizzle/migrations/0000_initial.sql` exists

---

### STEP 6: Start Development Server (1 minute)

```bash
npm run dev
```

**Expected Output**:
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

**Keep this terminal open!**

---

### STEP 7: Test Contact Form (5 minutes)

#### A. Submit a Test Form

1. **Open browser**: http://localhost:3000/connect/contact
2. **Fill out the form**:
   - Name: Test User
   - Email: your-email@example.com (use YOUR real email)
   - Subject: General Inquiry
   - Message: This is a test message from Phase 1 implementation
3. **Click**: "Send Message"
4. **Expected**: Success message appears

#### B. Check Admin Email

1. **Check** the email address you set as `ADMIN_EMAIL`
2. **Look for**: Email with subject "[CTK Website] General Inquiry"
3. **Verify**: Email contains the test message
4. **Check**: Reply button works

#### C. Check Auto-Reply Email

1. **Check** the email you used in the form
2. **Look for**: Email with subject "Thank you for contacting Christ The King Anglican Church"
3. **Verify**: Email contains your message and church info

#### D. Check Admin Dashboard

1. **Open**: http://localhost:3000/admin
2. **Login** with your `ADMIN_PASSWORD`
3. **Click**: "View Submissions" or go to http://localhost:3000/admin/submissions
4. **Verify**: Your test submission appears
5. **Check**: Status shows "new"
6. **Test**: Click "Reply via Email" button

---

## ✅ Success Criteria

Phase 1 is **FULLY WORKING** when:

- [ ] `npm install` completes without errors
- [ ] `.env.local` file exists with all API keys
- [ ] Database migrations run successfully
- [ ] Dev server starts without errors
- [ ] Contact form submits successfully
- [ ] Admin receives email notification
- [ ] User receives auto-reply email
- [ ] Submission appears in admin dashboard
- [ ] No errors in browser console
- [ ] No errors in terminal

---

## 🐛 Common Issues & Solutions

### Issue 1: "Module not found: resend"
**Solution**: 
```bash
npm install
```

### Issue 2: "RESEND_API_KEY is not defined"
**Solution**:
1. Check `.env.local` exists (not `.env`)
2. Verify `RESEND_API_KEY=re_...` is in the file
3. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Issue 3: "Failed to send email"
**Solution**:
1. Check Resend API key is correct
2. Log into Resend dashboard and check "Logs" section
3. Verify you haven't exceeded 3,000 emails/month
4. Try using `onboarding@resend.dev` as `EMAIL_FROM`

### Issue 4: "Database not found"
**Solution**:
```bash
npx wrangler d1 create ctk-website-db --local
npm run db:migrate
```

### Issue 5: "Admin dashboard shows no submissions"
**Solution**:
1. Check browser console for errors (F12)
2. Check terminal for errors
3. Verify database was created: `ls .wrangler/state/v3/d1/`
4. Try submitting form again

### Issue 6: "Emails going to spam"
**Solution**:
- This is normal for `onboarding@resend.dev`
- Check spam/junk folder
- For production, verify your domain in Resend

### Issue 7: "Port 3000 already in use"
**Solution**:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

---

## 📊 Testing Checklist

### Basic Functionality
- [ ] Form validation works (try submitting empty form)
- [ ] Email validation works (try invalid email)
- [ ] Success message appears after submission
- [ ] Form clears after successful submission
- [ ] Loading state shows during submission

### Email Delivery
- [ ] Admin email arrives within 1 minute
- [ ] Auto-reply email arrives within 1 minute
- [ ] Emails have correct formatting
- [ ] Reply-to address is correct
- [ ] Links in email work (mailto, tel)

### Admin Dashboard
- [ ] Dashboard requires login
- [ ] Submissions list loads
- [ ] Submission details are correct
- [ ] Status badge shows correctly
- [ ] Reply button opens email client
- [ ] Call button works (if phone provided)

### Error Handling
- [ ] Invalid email shows error
- [ ] Empty fields show errors
- [ ] Network errors show user-friendly message
- [ ] Database errors don't crash the app

---

## 🎯 What Happens After Phase 1

Once Phase 1 is working:

### Immediate Benefits
✅ No more Formspree dependency  
✅ Professional email notifications  
✅ Database storage of all submissions  
✅ Admin dashboard to manage contacts  
✅ All running on FREE tier  

### Ready for Production
When you're ready to deploy:
1. Create production D1 database in Cloudflare
2. Set environment variables in Cloudflare dashboard
3. Deploy with `npm run deploy`
4. Test on production URL

### Next: Phase 2 (Optional)
- Sermon management system
- Media hosting for audio/video
- SEO improvements
- Analytics integration

---

## 📞 Need Help?

### Quick Checks
1. **Check terminal** for error messages
2. **Check browser console** (F12 → Console tab)
3. **Check Resend dashboard** → Logs section
4. **Check `.env.local`** file has all variables

### Documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- `PHASE1_IMPLEMENTATION.md` - What was implemented
- `PROJECT_EVALUATION.md` - Full project analysis

### Test Commands
```bash
# Check if dependencies are installed
npm list resend drizzle-orm zod

# Check if database exists
ls -la .wrangler/state/v3/d1/

# Check environment variables (don't share output!)
cat .env.local

# Test database connection
npm run db:studio
```

---

## 🎉 You're Done When...

You can successfully:
1. ✅ Submit the contact form
2. ✅ Receive admin email
3. ✅ Receive auto-reply email
4. ✅ View submission in admin dashboard
5. ✅ Reply to the submission via email

**Estimated Time**: 20-30 minutes total

**Monthly Cost**: $0 (everything on free tier)

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Install
npm install

# 2. Setup environment (then edit .env.local with your keys)
cp .env.example .env.local

# 3. Setup database
npm run db:generate
npx wrangler d1 create ctk-website-db --local
npm run db:migrate

# 4. Start server
npm run dev

# 5. Test at http://localhost:3000/connect/contact
```

**Get API Keys From**:
- Resend: https://resend.com (email service)
- Cloudflare: https://dash.cloudflare.com (database)

---

## ✅ Final Verification

Run this command to verify everything is set up:

```bash
# Check all files exist
ls -la src/app/api/contact/route.ts \
       src/lib/email.ts \
       src/db/schema.ts \
       src/app/admin/submissions/page.tsx \
       drizzle/migrations/0000_initial.sql \
       .env.local

# Should show all files exist
```

If all files exist and you've completed steps 1-7, **Phase 1 is complete!** 🎉
