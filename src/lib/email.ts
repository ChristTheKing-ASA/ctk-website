import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactFormEmail(data: ContactFormEmailData) {
  const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
  const adminEmail = process.env.ADMIN_EMAIL || "ctkrector@gmail.com";

  try {
    const result = await resend.emails.send({
      from: emailFrom,
      to: adminEmail,
      replyTo: data.email,
      subject: `[CTK Website] ${data.subject}`,
      html: generateAdminEmailHtml(data),
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendContactFormAutoReply(data: ContactFormEmailData) {
  const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";

  try {
    const result = await resend.emails.send({
      from: emailFrom,
      to: data.email,
      subject: "Thank you for contacting Christ The King Anglican Church",
      html: generateAutoReplyHtml(data),
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Failed to send auto-reply:", error);
    return { success: false, error };
  }
}

function generateAdminEmailHtml(data: ContactFormEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #334e68; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h1>
  </div>
  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <div style="margin-bottom: 20px;">
      <strong style="color: #334e68;">From:</strong>
      <div style="background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #f59e0b; margin-top: 5px;">
        ${data.name}
      </div>
    </div>
    <div style="margin-bottom: 20px;">
      <strong style="color: #334e68;">Email:</strong>
      <div style="background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #f59e0b; margin-top: 5px;">
        <a href="mailto:${data.email}" style="color: #334e68;">${data.email}</a>
      </div>
    </div>
    ${
      data.phone
        ? `<div style="margin-bottom: 20px;">
      <strong style="color: #334e68;">Phone:</strong>
      <div style="background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #f59e0b; margin-top: 5px;">
        <a href="tel:${data.phone}" style="color: #334e68;">${data.phone}</a>
      </div>
    </div>`
        : ""
    }
    <div style="margin-bottom: 20px;">
      <strong style="color: #334e68;">Subject:</strong>
      <div style="background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #f59e0b; margin-top: 5px;">
        ${data.subject}
      </div>
    </div>
    <div style="margin-bottom: 20px;">
      <strong style="color: #334e68;">Message:</strong>
      <div style="background: white; padding: 20px; border-radius: 4px; border-left: 3px solid #f59e0b; margin-top: 5px; white-space: pre-wrap;">
        ${data.message}
      </div>
    </div>
    <div style="text-align: center; margin-top: 30px;">
      <a href="mailto:${data.email}" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
        Reply to ${data.name}
      </a>
    </div>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
      <p>Submitted from CTK Website contact form</p>
      <p>${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}</p>
    </div>
  </div>
</body>
</html>`;
}

function generateAutoReplyHtml(data: ContactFormEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #334e68; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">✝️ Thank You for Reaching Out</h1>
  </div>
  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <p>Dear ${data.name},</p>
    <p>Thank you for contacting Christ The King Anglican Church. We have received your message and will respond as soon as possible.</p>
    <p><strong>Your message:</strong></p>
    <div style="background: white; padding: 20px; border-radius: 4px; border-left: 3px solid #f59e0b; white-space: pre-wrap;">
      ${data.message}
    </div>
    <p style="margin-top: 30px;">If you need immediate assistance, please call us at <a href="tel:904-217-3574" style="color: #334e68;">904-217-3574</a>.</p>
    <p>Blessings,<br><strong>Christ The King Anglican Church</strong></p>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
      <p><strong>Christ The King Anglican Church</strong><br>
      2503 Old Moultrie Road<br>
      St. Augustine, FL 32086<br>
      <a href="https://ctkasa.com" style="color: #334e68;">ctkasa.com</a></p>
    </div>
  </div>
</body>
</html>`;
}
