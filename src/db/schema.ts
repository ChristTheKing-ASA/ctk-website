import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Contact Form Submissions
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status", {
    enum: ["new", "read", "responded", "archived"],
  })
    .notNull()
    .default("new"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  respondedAt: text("responded_at"),
  notes: text("notes"),
});

// Newsletter Subscribers
export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  status: text("status", {
    enum: ["active", "unsubscribed", "bounced"],
  })
    .notNull()
    .default("active"),
  subscribedAt: text("subscribed_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  unsubscribedAt: text("unsubscribed_at"),
  unsubscribeToken: text("unsubscribe_token").unique(),
  source: text("source").notNull().default("website"),
});

// Prayer Requests
export const prayerRequests = sqliteTable("prayer_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  request: text("request").notNull(),
  isPublic: integer("is_public", { mode: "boolean" }).notNull().default(false),
  isUrgent: integer("is_urgent", { mode: "boolean" }).notNull().default(false),
  status: text("status", {
    enum: ["pending", "approved", "praying", "answered", "archived"],
  })
    .notNull()
    .default("pending"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  approvedAt: text("approved_at"),
  notes: text("notes"),
});

// Event Registrations (for future use)
export const eventRegistrations = sqliteTable("event_registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventSlug: text("event_slug").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  numberOfAttendees: integer("number_of_attendees").notNull().default(1),
  specialNeeds: text("special_needs"),
  status: text("status", {
    enum: ["confirmed", "cancelled", "waitlist"],
  })
    .notNull()
    .default("confirmed"),
  registeredAt: text("registered_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  cancelledAt: text("cancelled_at"),
});

// Type exports for TypeScript
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

export type PrayerRequest = typeof prayerRequests.$inferSelect;
export type NewPrayerRequest = typeof prayerRequests.$inferInsert;

export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type NewEventRegistration = typeof eventRegistrations.$inferInsert;
