import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb, newsletterSubscribers } from "@/db";
import { generateToken } from "@/lib/tokens";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email, name } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    if (!process.env.DB) {
      return NextResponse.json(
        { error: "Newsletter service is temporarily unavailable. Please contact us directly." },
        { status: 503 },
      );
    }

    const db = getDb(process.env.DB);
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      if (existing[0].status === "active") {
        return NextResponse.json({
          success: true,
          message: "You are already subscribed to our newsletter.",
        });
      }

      await db
        .update(newsletterSubscribers)
        .set({
          status: "active",
          name: name || existing[0].name,
          unsubscribedAt: null,
        })
        .where(eq(newsletterSubscribers.email, normalizedEmail));

      return NextResponse.json({
        success: true,
        message: "Welcome back! You have been resubscribed.",
      });
    }

    await db.insert(newsletterSubscribers).values({
      email: normalizedEmail,
      name: name || null,
      status: "active",
      unsubscribeToken: generateToken(),
      source: "website",
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
