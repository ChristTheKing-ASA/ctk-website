import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb, prayerRequests } from "@/db";
import { sendPrayerRequestNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(30).optional(),
  request: z.string().min(10).max(2000),
  isPublic: z.boolean().optional().default(false),
  isUrgent: z.boolean().optional().default(false),
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

    const data = result.data;
    let storedInDb = false;

    if (process.env.DB) {
      try {
        const db = getDb(process.env.DB);
        await db.insert(prayerRequests).values({
          name: data.name,
          email: data.email || null,
          phone: data.phone || null,
          request: data.request,
          isPublic: data.isPublic,
          isUrgent: data.isUrgent,
          status: "pending",
        });
        storedInDb = true;
      } catch (dbError) {
        console.error("Failed to store prayer request:", dbError);
      }
    }

    const emailResult = await sendPrayerRequestNotification({
      name: data.name,
      email: data.email || undefined,
      phone: data.phone,
      request: data.request,
      isUrgent: data.isUrgent,
    });

    if (!emailResult.success && !storedInDb) {
      return NextResponse.json(
        {
          error:
            "We could not deliver your prayer request right now. Please call the church office or try again later.",
        },
        { status: 500 },
      );
    }

    if (!emailResult.success) {
      console.warn("Prayer request stored but admin email failed:", emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Your prayer request has been received. Our prayer team will be lifting you up.",
    });
  } catch (error) {
    console.error("Prayer request error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
