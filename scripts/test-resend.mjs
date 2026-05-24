/**
 * Test Resend configuration.
 * Run: npm run test:resend
 */
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey || apiKey === "re_xxxxxxxxx" || apiKey.includes("your_key")) {
  console.error(`
❌ RESEND_API_KEY is not set in .env.local

Fix:
  1. Open .env.local (NOT .env.example)
  2. Replace re_xxxxxxxxx with your key from https://resend.com/api-keys
  3. Run: npm run test:resend
`);
  process.exit(1);
}

const to = process.env.ADMIN_EMAIL;
if (!to) {
  console.error("❌ Set ADMIN_EMAIL in .env.local");
  process.exit(1);
}

const resend = new Resend(apiKey);
const preferredFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
const fallbackFrom = "onboarding@resend.dev";

async function trySend(from) {
  return resend.emails.send({
    from,
    to,
    subject: "CTK Website — Resend test",
    html: "<p>Congrats — <strong>Resend is working</strong> for the CTK website!</p>",
  });
}

console.log(`Sending test email to ${to}...`);

let result = await trySend(preferredFrom);

if (result.error && preferredFrom !== fallbackFrom) {
  console.warn(`⚠️  Failed with ${preferredFrom}: ${result.error.message}`);
  console.warn(`   Retrying with ${fallbackFrom} (use this until ctkasa.com is verified in Resend)...`);
  result = await trySend(fallbackFrom);
}

if (result.error) {
  console.error("❌ Failed:", result.error);
  process.exit(1);
}

console.log("✅ Email sent successfully! ID:", result.data?.id);
if (preferredFrom !== fallbackFrom && result.data?.id) {
  console.log("\nNote: If you used onboarding@resend.dev, verify ctkasa.com in Resend");
  console.log("      then set EMAIL_FROM=website@ctkasa.com for production.");
}
