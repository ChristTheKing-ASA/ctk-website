# CTK Website - Full Stack Application Evaluation & Roadmap

## Executive Summary

This is a **Next.js 16** church website for Christ The King Anglican Church with a headless CMS (Keystatic) for content management. The application is **80% complete** with a solid foundation but requires several backend features and integrations to become a fully functional full-stack application.

---

## Current Tech Stack ✅

### Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4 with custom Anglican color palette
- **UI Components**: Custom components + Headless UI + Lucide React icons
- **Fonts**: Google Fonts (Open Sans, Playfair Display)
- **Animations**: Canvas Confetti for interactive elements

### Backend/CMS
- **CMS**: Keystatic (headless CMS with local/GitHub storage)
- **Authentication**: Custom server-side session-based auth for admin panel
- **API Routes**: Next.js API routes for admin login/logout
- **Session Management**: HTTP-only cookies with signed tokens

### Deployment
- **Target Platform**: Cloudflare (via OpenNext Cloudflare adapter)
- **Build Tool**: @opennextjs/cloudflare
- **Alternative**: Can deploy to Vercel

### Testing
- **Framework**: Vitest
- **Testing Library**: React Testing Library + Jest DOM
- **Coverage**: Basic component and utility tests exist

### Development
- **Language**: TypeScript 5
- **Linting**: ESLint 9 with Next.js config
- **Package Manager**: npm

---

## What's Already Implemented ✅

### 1. **Content Management System**
- ✅ Keystatic CMS configured with collections and singletons
- ✅ Admin panel at `/admin` with password protection
- ✅ Content types: Clergy, Mission Partners, Weekly Activities, Announcements
- ✅ Singleton content: Church Info, DeafChurch Info
- ✅ Local file-based storage (can switch to GitHub mode)

### 2. **Authentication & Security**
- ✅ Server-side session authentication for admin panel
- ✅ HTTP-only cookies with signed tokens
- ✅ Environment-based password configuration
- ✅ 24-hour session expiration
- ✅ Logout functionality

### 3. **Frontend Pages**
- ✅ Home page with hero, rector welcome, featured ministries
- ✅ About section (team, beliefs, story, Anglican faith)
- ✅ Connect section (classes, contact, membership, small groups, DHC)
- ✅ Serve section (ministries, safeguarding)
- ✅ Missions page with filtering
- ✅ Worship section (sermons, weekly schedule)
- ✅ DeafChurch dedicated page
- ✅ Give page
- ✅ Visit page

### 4. **UI Components**
- ✅ Reusable Button, Card, Section components
- ✅ Header and Footer layout components
- ✅ Contact form with validation (using Formspree)
- ✅ Responsive design with mobile navigation
- ✅ Accessibility features (ARIA labels, semantic HTML)

### 5. **Data Layer**
- ✅ Content reader utilities for Keystatic
- ✅ Type-safe data transformations
- ✅ Helper functions for fetching clergy, missions, activities, announcements

### 6. **Testing Infrastructure**
- ✅ Vitest setup with React Testing Library
- ✅ Component tests for Button, Card, Section
- ✅ Utility function tests
- ✅ Validation tests
- ✅ Mock setup for Next.js modules

---

## What's Missing / Needs Implementation ❌

### 1. **Contact Form Backend** 🔴 HIGH PRIORITY
**Current State**: Using Formspree (third-party service)
**Issues**: 
- Hardcoded Formspree endpoint
- No control over email delivery
- No database storage of submissions
- No admin dashboard to view submissions

**Required Implementation**:
```typescript
// Create: src/app/api/contact/route.ts
- Email sending via Resend, SendGrid, or AWS SES
- Form validation on server-side
- Rate limiting to prevent spam
- Optional: Store submissions in database
- Email notification to church admin
- Auto-reply to submitter
```

**Recommended Tech Stack**:
- **Email Service**: [Resend](https://resend.com) (modern, developer-friendly, generous free tier)
- **Alternative**: SendGrid, AWS SES, Nodemailer with SMTP
- **Rate Limiting**: Upstash Redis or Vercel KV
- **Validation**: Zod for schema validation

---

### 2. **Database Integration** 🟡 MEDIUM PRIORITY
**Current State**: All content stored in JSON files via Keystatic
**Issues**:
- No relational data
- No user-generated content storage
- No analytics or tracking
- No form submission history

**Required Implementation**:
- Database for contact form submissions
- Prayer request storage (if needed)
- Event registration tracking
- Newsletter subscriptions
- Visitor tracking/analytics

**Recommended Tech Stack**:
- **Primary Option**: **Cloudflare D1** (SQLite, serverless, free tier, perfect for Cloudflare deployment)
- **Alternative 1**: **Turso** (libSQL, edge-native, generous free tier)
- **Alternative 2**: **Neon** (Postgres, serverless, free tier)
- **Alternative 3**: **PlanetScale** (MySQL, serverless)
- **ORM**: **Drizzle ORM** (TypeScript-first, works great with D1/Turso)

**Schema Example**:
```sql
CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME
);

CREATE TABLE newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME,
  status TEXT DEFAULT 'active'
);

CREATE TABLE prayer_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3. **Email Service Integration** 🔴 HIGH PRIORITY
**Current State**: No email sending capability
**Required For**:
- Contact form responses
- Admin notifications
- Newsletter (future)
- Event reminders (future)
- Prayer request confirmations

**Recommended Implementation**:
```typescript
// Create: src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactFormEmail(data: ContactFormData) {
  await resend.emails.send({
    from: 'website@ctkasa.com',
    to: process.env.ADMIN_EMAIL,
    subject: `[CTK Website] ${data.subject}`,
    html: `<p><strong>From:</strong> ${data.name} (${data.email})</p>
           <p><strong>Message:</strong></p>
           <p>${data.message}</p>`
  });
}
```

**Recommended Tech Stack**:
- **Resend** (best for modern Next.js apps, React Email support)
- **SendGrid** (enterprise-grade, more complex)
- **AWS SES** (cheapest at scale, requires AWS setup)

---

### 4. **Sermon Management System** 🟡 MEDIUM PRIORITY
**Current State**: Basic sermon page exists but no content management
**Required**:
- Sermon upload/management via Keystatic
- Audio/video file hosting
- Sermon series organization
- Search and filtering
- Transcript support

**Recommended Implementation**:
```typescript
// Add to keystatic.config.ts
sermons: collection({
  label: "Sermons",
  slugField: "title",
  path: "src/content/sermons/*",
  schema: {
    title: fields.text({ label: "Title" }),
    date: fields.date({ label: "Date" }),
    speaker: fields.text({ label: "Speaker" }),
    series: fields.text({ label: "Series (optional)" }),
    scripture: fields.text({ label: "Scripture Reference" }),
    audioUrl: fields.url({ label: "Audio URL" }),
    videoUrl: fields.url({ label: "Video URL (optional)" }),
    transcript: fields.document({ label: "Transcript" }),
    description: fields.text({ label: "Description", multiline: true }),
  },
}),
```

**Media Hosting Options**:
- **Cloudflare R2** (S3-compatible, no egress fees)
- **AWS S3** (industry standard)
- **Cloudinary** (with transcoding)
- **YouTube** (for video, free)

---

### 5. **Event Management System** 🟢 LOW PRIORITY
**Current State**: Static weekly activities only
**Required**:
- Special events (not weekly)
- Event registration
- Calendar integration
- RSVP tracking
- Capacity limits

**Recommended Implementation**:
```typescript
// Add to keystatic.config.ts
events: collection({
  label: "Events",
  slugField: "title",
  path: "src/content/events/*",
  schema: {
    title: fields.text({ label: "Title" }),
    startDate: fields.datetime({ label: "Start Date & Time" }),
    endDate: fields.datetime({ label: "End Date & Time" }),
    location: fields.text({ label: "Location" }),
    description: fields.document({ label: "Description" }),
    registrationRequired: fields.checkbox({ label: "Registration Required" }),
    capacity: fields.number({ label: "Capacity (optional)" }),
    registrationDeadline: fields.date({ label: "Registration Deadline" }),
    image: fields.image({ label: "Event Image" }),
  },
}),
```

---

### 6. **Newsletter System** 🟢 LOW PRIORITY
**Current State**: No newsletter functionality
**Required**:
- Email subscription form
- Subscriber management
- Newsletter composition
- Send scheduling
- Unsubscribe handling

**Recommended Tech Stack**:
- **Resend** (for sending)
- **React Email** (for templates)
- **Database** (for subscriber list)
- **Admin UI** (via Keystatic or custom)

---

### 7. **Analytics & Monitoring** 🟡 MEDIUM PRIORITY
**Current State**: No analytics
**Required**:
- Page view tracking
- User behavior analytics
- Error monitoring
- Performance monitoring
- Form conversion tracking

**Recommended Tech Stack**:
- **Analytics**: Vercel Analytics (if on Vercel) or Cloudflare Web Analytics (privacy-friendly, free)
- **Alternative**: Plausible, Fathom (privacy-focused, paid)
- **Error Tracking**: Sentry (free tier available)
- **Performance**: Vercel Speed Insights or Cloudflare Web Vitals

---

### 8. **Search Functionality** 🟢 LOW PRIORITY
**Current State**: No search
**Required**:
- Search sermons
- Search ministries
- Search content pages
- Search clergy/staff

**Recommended Tech Stack**:
- **Algolia** (powerful, free tier)
- **Meilisearch** (open-source, self-hosted)
- **Pagefind** (static search, no backend needed)
- **Simple**: Client-side search with Fuse.js

---

### 9. **SEO Enhancements** 🟡 MEDIUM PRIORITY
**Current State**: Basic metadata exists
**Required**:
- Dynamic OG images
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt optimization
- Schema.org markup for church

**Implementation**:
```typescript
// Add to pages
export async function generateMetadata(): Promise<Metadata> {
  return {
    // ... existing metadata
    other: {
      'og:type': 'website',
      'og:site_name': 'Christ The King Anglican Church',
    },
    alternates: {
      canonical: 'https://ctkasa.com',
    },
  };
}

// Add JSON-LD structured data
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Church",
  "name": "Christ The King Anglican Church",
  "address": { ... },
  "telephone": "...",
  "url": "https://ctkasa.com"
}
</script>
```

---

### 10. **Admin Dashboard** 🟢 LOW PRIORITY
**Current State**: Only Keystatic CMS admin
**Required**:
- View contact form submissions
- Manage prayer requests
- View analytics dashboard
- Manage newsletter subscribers
- Export data

**Recommended Tech Stack**:
- Build custom admin pages in `/admin/*`
- Use Keystatic for content, custom pages for data
- **UI Library**: Shadcn/ui or Tremor for dashboard components

---

## Recommended Implementation Priority

### Phase 1: Core Backend (Weeks 1-2) 🔴
1. **Contact Form API** - Replace Formspree with custom endpoint
2. **Email Service** - Integrate Resend for email sending
3. **Database Setup** - Cloudflare D1 + Drizzle ORM
4. **Contact Submissions Storage** - Store form submissions in DB

### Phase 2: Content Enhancement (Weeks 3-4) 🟡
5. **Sermon Management** - Add sermon collection to Keystatic
6. **Media Hosting** - Set up Cloudflare R2 for audio/video
7. **SEO Improvements** - Add structured data and dynamic OG images
8. **Analytics** - Integrate Cloudflare Web Analytics

### Phase 3: Advanced Features (Weeks 5-6) 🟢
9. **Event System** - Add events collection and registration
10. **Newsletter** - Subscription form and sending capability
11. **Admin Dashboard** - Custom admin pages for data management
12. **Search** - Implement search functionality

---

## Recommended Tech Stack Additions

### Essential (Phase 1)
```json
{
  "dependencies": {
    "resend": "^4.0.0",           // Email sending
    "drizzle-orm": "^0.36.0",     // Database ORM
    "@cloudflare/workers-types": "^4.0.0",  // Cloudflare types
    "zod": "^3.23.0"              // Schema validation
  },
  "devDependencies": {
    "drizzle-kit": "^0.28.0",     // Database migrations
    "wrangler": "^4.63.0"         // Already installed
  }
}
```

### Optional (Phase 2-3)
```json
{
  "dependencies": {
    "@react-email/components": "^0.0.25",  // Email templates
    "react-email": "^3.0.0",
    "date-fns": "^4.1.0",         // Date utilities
    "@vercel/analytics": "^1.4.0", // Analytics (if on Vercel)
    "fuse.js": "^7.0.0"           // Client-side search
  }
}
```

---

## Environment Variables Needed

### Current
```env
# Already configured
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
```

### Required Additions
```env
# Email Service
RESEND_API_KEY=
ADMIN_EMAIL=ctkrector@gmail.com

# Database (Cloudflare D1)
# Configured via wrangler.toml, not .env

# Optional
NEXT_PUBLIC_SITE_URL=https://ctkasa.com
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
```

---

## Database Schema Recommendation

```sql
-- Contact Form Submissions
CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'read', 'responded', 'archived')),
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME,
  notes TEXT
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'unsubscribed', 'bounced')),
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME,
  unsubscribe_token TEXT UNIQUE,
  source TEXT DEFAULT 'website'
);

-- Prayer Requests
CREATE TABLE prayer_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT 0,
  is_urgent BOOLEAN DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'praying', 'answered', 'archived')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  notes TEXT
);

-- Event Registrations
CREATE TABLE event_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  number_of_attendees INTEGER DEFAULT 1,
  special_needs TEXT,
  status TEXT DEFAULT 'confirmed' CHECK(status IN ('confirmed', 'cancelled', 'waitlist')),
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  cancelled_at DATETIME
);

-- Analytics (optional, if not using external service)
CREATE TABLE page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Deployment Checklist

### Cloudflare Deployment
- [ ] Set up Cloudflare Pages project
- [ ] Configure environment variables in Cloudflare dashboard
- [ ] Set up Cloudflare D1 database
- [ ] Run database migrations
- [ ] Configure custom domain
- [ ] Set up Cloudflare R2 bucket for media (if needed)
- [ ] Configure Cloudflare Web Analytics
- [ ] Test admin authentication
- [ ] Test contact form submission
- [ ] Verify email sending

### Vercel Deployment (Alternative)
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Set up external database (Turso/Neon)
- [ ] Configure custom domain
- [ ] Enable Vercel Analytics
- [ ] Test all functionality

---

## Testing Requirements

### Current Coverage
- ✅ Component tests (Button, Card, Section)
- ✅ Utility function tests
- ✅ Validation tests

### Missing Tests
- [ ] API route tests (contact form, admin auth)
- [ ] Integration tests (form submission flow)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Database query tests
- [ ] Email sending tests (mocked)

---

## Performance Optimization Opportunities

1. **Image Optimization**
   - Currently using `unoptimized: true` in next.config.ts
   - Should enable Next.js Image Optimization or use Cloudflare Images

2. **Code Splitting**
   - Implement dynamic imports for heavy components
   - Lazy load admin panel components

3. **Caching Strategy**
   - Implement ISR (Incremental Static Regeneration) for content pages
   - Cache Keystatic content reads
   - Add Redis caching for frequently accessed data

4. **Bundle Size**
   - Audit and remove unused dependencies
   - Use dynamic imports for large libraries

---

## Security Enhancements

1. **Rate Limiting** - Add to contact form and API routes
2. **CSRF Protection** - Implement for form submissions
3. **Input Sanitization** - Server-side validation for all inputs
4. **SQL Injection Prevention** - Use parameterized queries (Drizzle handles this)
5. **XSS Prevention** - Sanitize user-generated content
6. **Content Security Policy** - Add CSP headers
7. **HTTPS Enforcement** - Ensure all traffic is HTTPS

---

## Accessibility Improvements

Current state is good, but consider:
- [ ] Add skip navigation links
- [ ] Ensure all images have alt text
- [ ] Test with screen readers
- [ ] Add ARIA live regions for dynamic content
- [ ] Ensure keyboard navigation works everywhere
- [ ] Add focus indicators
- [ ] Test color contrast ratios

---

## Documentation Needs

- [ ] API documentation
- [ ] Database schema documentation
- [ ] Deployment guide
- [ ] Content management guide for church staff
- [ ] Development setup guide
- [ ] Contributing guidelines

---

## Estimated Timeline

- **Phase 1 (Core Backend)**: 2 weeks
- **Phase 2 (Content Enhancement)**: 2 weeks
- **Phase 3 (Advanced Features)**: 2 weeks
- **Testing & Polish**: 1 week
- **Total**: ~7 weeks for full implementation

---

## Budget Considerations (Monthly)

### Free Tier Options
- Cloudflare Pages: Free (500 builds/month)
- Cloudflare D1: Free (5GB storage, 5M reads/day)
- Cloudflare R2: Free (10GB storage, 1M reads/month)
- Resend: Free (3,000 emails/month)
- Cloudflare Web Analytics: Free

### Paid Options (if needed)
- Resend Pro: $20/month (50,000 emails)
- Cloudflare Workers Paid: $5/month (10M requests)
- Domain: ~$12/year
- **Total**: Can run entirely on free tier initially

---

## Conclusion

This is a **well-architected Next.js application** with a solid foundation. The main gaps are:

1. **Backend API routes** for contact form and data management
2. **Database integration** for storing user-generated content
3. **Email service** for notifications and communication
4. **Content management** for sermons and events

The recommended tech stack (Cloudflare D1 + Resend + Drizzle ORM) aligns perfectly with the existing Cloudflare deployment strategy and can run entirely on free tiers initially.

**Priority**: Focus on Phase 1 (contact form backend, email, database) to make the site fully functional, then add advanced features in later phases.
