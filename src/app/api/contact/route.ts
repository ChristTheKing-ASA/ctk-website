import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactFormEmail, sendContactFormAutoReply } from "@/lib/email";
import { getDb, contactSubmissions } from "@/db";

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Get client info for logging
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Send emails (admin notification + auto-reply)
    const [adminEmailResult, autoReplyResult] = await Promise.allSettled([
      sendContactFormEmail(data),
      sendContactFormAutoReply(data),
    ]);

    // Check if admin email failed
    if (adminEmailResult.status === "rejected" || !adminEmailResult.value.success) {
      console.error("Failed to send admin email:", adminEmailResult);
      return NextResponse.json(
        { error: "Failed to send email. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    // Log auto-reply failure but don't fail the request
    if (autoReplyResult.status === "rejected" || !autoReplyResult.value.success) {
      console.warn("Failed to send auto-reply email:", autoReplyResult);
    }

    // Store in database (if D1 is available)
    try {
      if (process.env.DB) {
        const db = getDb(process.env.DB);

        await db.insert(contactSubmissions).values({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject,
          message: data.message,
          ipAddress,
          userAgent,
          status: "new",
        });
      }
    } catch (dbError) {
      // Log database error but don't fail the request
      // Email was sent successfully, which is the primary goal
      console.error("Failed to store submission in database:", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Rate limiting helper (optional, for future implementation)
// You can add rate limiting using Upstash Redis or Vercel KV
