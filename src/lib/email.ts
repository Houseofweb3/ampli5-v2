import nodemailer from "nodemailer";

// Recipients for "new entry" notifications (3 people)
const NOTIFY_RECIPIENTS = [
  process.env.NOTIFY_EMAIL_1,
  process.env.NOTIFY_EMAIL_2,
  process.env.NOTIFY_EMAIL_3,
].filter(Boolean) as string[];

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

export type NewEntryFormType = "creator" | "brand";

export interface NewEntryEmailPayload {
  formType: NewEntryFormType;
  subject: string;
  summary: string; // plain text or HTML summary
}

/**
 * Send email to the 3 notify recipients after a form is successfully stored in the sheet.
 * Call this only after sheet append succeeds.
 */
export async function sendNewEntryNotification(
  payload: NewEntryEmailPayload
): Promise<{ sent: boolean; error?: string }> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email not configured: BOUNTY_EMAIL_USER / BOUNTY_EMAIL_PASS not set");
    return { sent: false, error: "Email not configured" };
  }
  if (NOTIFY_RECIPIENTS.length === 0) {
    console.warn("No notify recipients configured");
    return { sent: false, error: "No recipients" };
  }

  try {
    const from = process.env.BOUNTY_EMAIL_USER;
    await transporter.sendMail({
      from: from || "noreply@ampli5.com",
      to: NOTIFY_RECIPIENTS.join(", "),
      subject: payload.subject,
      text: payload.summary,
      html: payload.summary.replace(/\n/g, "<br/>"),
    });
    return { sent: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("sendNewEntryNotification error:", message);
    return { sent: false, error: message };
  }
}
