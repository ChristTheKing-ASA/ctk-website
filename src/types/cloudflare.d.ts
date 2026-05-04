// Cloudflare Workers types for D1 database binding

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Existing
      ADMIN_PASSWORD?: string;
      ADMIN_SESSION_SECRET?: string;
      KEYSTATIC_GITHUB_CLIENT_ID?: string;
      KEYSTATIC_GITHUB_CLIENT_SECRET?: string;
      KEYSTATIC_SECRET?: string;
      
      // New - Email
      RESEND_API_KEY?: string;
      EMAIL_FROM?: string;
      ADMIN_EMAIL?: string;
      
      // New - Cloudflare
      CLOUDFLARE_ACCOUNT_ID?: string;
      CLOUDFLARE_API_TOKEN?: string;
      
      // New - Site
      NEXT_PUBLIC_SITE_URL?: string;
      
      // Cloudflare D1 binding (available in production)
      DB?: D1Database;
    }
  }
}

export {};
