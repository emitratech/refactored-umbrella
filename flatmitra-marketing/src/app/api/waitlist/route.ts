import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { promises as fs } from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAILS = (process.env.NOTIFY_EMAIL_TO ?? "")
  .split(",").map(e => e.trim()).filter(Boolean);

const FROM_NOTIFY  = "FlatMitra Waitlist <no-reply@mail.emitra.dev>";
const FROM_CONFIRM = "FlatMitra <hello@mail.emitra.dev>";

const ROLE_LABELS: Record<string, string> = {
  landlord: "Independent Landlord",
  manager:  "Property Manager",
  other:    "Enterprise / Other",
};

// ─────────────────────────────────────────────────────────
// LOCAL WAITLIST FILE  (data/waitlist.csv in project root)
// ─────────────────────────────────────────────────────────
async function appendToWaitlist(entry: {
  name: string; email: string; phone: string; role: string; units?: string;
}) {
  try {
    const dir  = path.join(process.cwd(), "data");
    const file = path.join(dir, "waitlist.csv");

    // Create dir + header row if first time
    await fs.mkdir(dir, { recursive: true });
    let exists = false;
    try { await fs.access(file); exists = true; } catch { /* new file */ }

    if (!exists) {
      await fs.writeFile(file, "timestamp,name,email,phone,role,units\n", "utf8");
    }

    const row = [
      new Date().toISOString(),
      `"${entry.name.replace(/"/g, '""')}"`,
      entry.email,
      `+91${entry.phone}`,
      ROLE_LABELS[entry.role] ?? entry.role,
      entry.units ?? "",
    ].join(",") + "\n";

    await fs.appendFile(file, row, "utf8");
  } catch (err) {
    // Non-fatal — don't break the request if file write fails (e.g. on Vercel)
    console.warn("[waitlist] Could not write to CSV:", err);
  }
}

// ─────────────────────────────────────────────────────────
// OWNER NOTIFICATION (same for all roles)
// ─────────────────────────────────────────────────────────
function ownerHtml(name: string, email: string, phone: string, role: string, units?: string) {
  return `
  <div style="font-family:'Helvetica Neue',sans-serif;max-width:520px;margin:0 auto;background:#fafaf9;border-radius:16px;overflow:hidden;border:1px solid #e5e4e0;">
    <img src="https://flat.emitra.dev/email-banner.png" alt="FlatMitra" width="520" style="width:100%;display:block;" />
    <div style="background:linear-gradient(135deg,#4338ca 0%,#6d28d9 100%);padding:28px 32px;">
      <p style="color:rgba(255,255,255,0.7);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">FlatMitra Waitlist</p>
      <h2 style="color:#fff;margin:0;font-size:1.3rem;font-weight:800;">🎉 New Signup — ${ROLE_LABELS[role] ?? role}</h2>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["Name",  name],
          ["Email", `<a href="mailto:${email}" style="color:#4338ca;">${email}</a>`],
          ["Phone", `+91 ${phone}`],
          ["Role",  ROLE_LABELS[role] ?? role],
          ...(units ? [["Units", `${units} units`]] : []),
        ].map(([label, val]) => `
          <tr>
            <td style="padding:9px 0;color:#888;font-size:0.8rem;width:80px;vertical-align:top;">${label}</td>
            <td style="padding:9px 0;font-weight:700;color:#111;font-size:0.9rem;">${val}</td>
          </tr>
        `).join("")}
      </table>
      <div style="margin-top:18px;padding:12px 16px;background:#f0eff8;border-radius:8px;font-size:0.75rem;color:#666;">
        ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
      </div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────
// USER CONFIRMATION — LANDLORD
// ─────────────────────────────────────────────────────────
function landlordHtml(firstName: string) {
  return `
  <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#fafaf9;border-radius:16px;overflow:hidden;border:1px solid #e5e4e0;">
    <img src="https://flat.emitra.dev/email-banner.png" alt="FlatMitra" width="560" style="width:100%;display:block;" />
    <div style="background:linear-gradient(135deg,#4338ca 0%,#6d28d9 100%);padding:40px 32px;text-align:center;">
      <p style="color:rgba(255,255,255,0.7);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">FlatMitra Early Access</p>
      <h1 style="color:#fff;margin:0;font-size:2rem;font-weight:900;letter-spacing:-0.03em;line-height:1.1;">
        You're in, ${firstName}! 🏠
      </h1>
      <p style="color:rgba(255,255,255,0.8);margin:14px 0 0;font-size:0.95rem;">Your spot is reserved. Here's what we're building for landlords like you.</p>
    </div>
    <div style="padding:36px 32px;">
      <div style="background:#f0eff8;border-radius:12px;padding:24px;margin-bottom:28px;">
        <p style="font-size:0.68rem;font-weight:700;color:#4338ca;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 16px;">Built for independent landlords</p>
        ${[
          ["💸", "Collect rent via WhatsApp — zero follow-up calls"],
          ["📋", "Aadhaar KYC + digital agreement in under 3 minutes"],
          ["📊", "Real-time P&L for every flat you own"],
          ["🔔", "Tenants raise issues; you get a neat ticket, not a 3am call"],
          ["🏠", "QR code on door — tenant onboards themselves"],
        ].map(([icon, text]) => `
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
            <span style="font-size:1rem;flex-shrink:0;">${icon}</span>
            <span style="font-size:0.875rem;color:#1a1c1a;line-height:1.5;">${text}</span>
          </div>`).join("")}
      </div>
      <div style="text-align:center;">
        <a href="https://flat.emitra.dev/features" style="display:inline-block;background:linear-gradient(135deg,#4338ca,#6d28d9);color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.9rem;">See All Features →</a>
      </div>
      <p style="margin-top:24px;font-size:0.75rem;color:#999;text-align:center;line-height:1.6;">
        We'll reach out personally before launch.<br/>
        Questions? <a href="mailto:hello@emitra.dev" style="color:#4338ca;">hello@emitra.dev</a><br/>
        FlatMitra · eMitra Technologies · India
      </p>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────
// USER CONFIRMATION — PROPERTY MANAGER
// ─────────────────────────────────────────────────────────
function managerHtml(firstName: string) {
  return `
  <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#fafaf9;border-radius:16px;overflow:hidden;border:1px solid #e5e4e0;">
    <img src="https://flat.emitra.dev/email-banner.png" alt="FlatMitra" width="560" style="width:100%;display:block;" />
    <div style="background:linear-gradient(135deg,#1e1b4b 0%,#4338ca 100%);padding:40px 32px;text-align:center;">
      <p style="color:rgba(255,255,255,0.7);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">FlatMitra — For Professionals</p>
      <h1 style="color:#fff;margin:0;font-size:2rem;font-weight:900;letter-spacing:-0.03em;line-height:1.1;">
        Welcome aboard, ${firstName}! 🏢
      </h1>
      <p style="color:rgba(255,255,255,0.8);margin:14px 0 0;font-size:0.95rem;">Built for professionals who manage properties on behalf of clients.</p>
    </div>
    <div style="padding:36px 32px;">
      <div style="background:#f0eff8;border-radius:12px;padding:24px;margin-bottom:28px;">
        <p style="font-size:0.68rem;font-weight:700;color:#4338ca;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 16px;">Designed for property managers</p>
        ${[
          ["🏗️", "Manage multiple buildings and owners from one dashboard"],
          ["👥", "Role-Based Access — assign buildings to specific staff"],
          ["📑", "Tax-ready reports per owner, per building, per period"],
          ["⚙️",  "Automate rent reminders across your entire portfolio"],
          ["🔐", "Full audit log — every action is tracked and accountable"],
        ].map(([icon, text]) => `
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
            <span style="font-size:1rem;flex-shrink:0;">${icon}</span>
            <span style="font-size:0.875rem;color:#1a1c1a;line-height:1.5;">${text}</span>
          </div>`).join("")}
      </div>
      <div style="text-align:center;">
        <a href="https://flat.emitra.dev/features#reporting" style="display:inline-block;background:linear-gradient(135deg,#1e1b4b,#4338ca);color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.9rem;">Explore Manager Features →</a>
      </div>
      <p style="margin-top:24px;font-size:0.75rem;color:#999;text-align:center;line-height:1.6;">
        Our team will walk you through a personalised demo before launch.<br/>
        <a href="mailto:hello@emitra.dev" style="color:#4338ca;">hello@emitra.dev</a><br/>
        FlatMitra · eMitra Technologies · India
      </p>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────
// USER CONFIRMATION — ENTERPRISE / OTHER
// ─────────────────────────────────────────────────────────
function enterpriseHtml(firstName: string) {
  return `
  <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#fafaf9;border-radius:16px;overflow:hidden;border:1px solid #e5e4e0;">
    <img src="https://flat.emitra.dev/email-banner.png" alt="FlatMitra" width="560" style="width:100%;display:block;" />
    <div style="background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#4338ca 100%);padding:40px 32px;text-align:center;">
      <p style="color:rgba(255,255,255,0.7);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">FlatMitra Enterprise</p>
      <h1 style="color:#fff;margin:0;font-size:2rem;font-weight:900;letter-spacing:-0.03em;line-height:1.1;">
        Let's talk, ${firstName}. 🤝
      </h1>
      <p style="color:rgba(255,255,255,0.8);margin:14px 0 0;font-size:0.95rem;">We'll set up everything — tailored to your scale and workflow.</p>
    </div>
    <div style="padding:36px 32px;">
      <div style="background:#f0eff8;border-radius:12px;padding:24px;margin-bottom:28px;">
        <p style="font-size:0.68rem;font-weight:700;color:#4338ca;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 16px;">What enterprise access includes</p>
        ${[
          ["🏙️", "Custom onboarding — our team sets everything up for you"],
          ["🔗", "API access and integration support for your existing tools"],
          ["📊", "Portfolio-wide reporting across any number of properties"],
          ["🛡️", "Dedicated account manager and priority support"],
          ["📝", "Custom contracts, SLAs, and white-label options available"],
        ].map(([icon, text]) => `
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
            <span style="font-size:1rem;flex-shrink:0;">${icon}</span>
            <span style="font-size:0.875rem;color:#1a1c1a;line-height:1.5;">${text}</span>
          </div>`).join("")}
      </div>
      <div style="text-align:center;">
        <a href="mailto:sales@emitra.dev?subject=Enterprise%20Enquiry%20from%20${encodeURIComponent(firstName)}" style="display:inline-block;background:linear-gradient(135deg,#302b63,#4338ca);color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.9rem;">Talk to Our Sales Team →</a>
      </div>
      <p style="margin-top:24px;font-size:0.75rem;color:#999;text-align:center;line-height:1.6;">
        Expect a call from our team within 24 hours.<br/>
        <a href="mailto:sales@emitra.dev" style="color:#4338ca;">sales@emitra.dev</a><br/>
        FlatMitra · eMitra Technologies · India
      </p>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────
// ROUTE HANDLER
// ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, role, units } = body;

    if (!name || !email || !phone || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const firstName = name.split(" ")[0];

    // Pick the right confirmation template
    const confirmHtml =
      role === "landlord" ? landlordHtml(firstName) :
      role === "manager"  ? managerHtml(firstName)  :
                            enterpriseHtml(firstName);

    const confirmSubject =
      role === "landlord" ? `You're on the FlatMitra waitlist, ${firstName}! 🏠` :
      role === "manager"  ? `Welcome to FlatMitra, ${firstName} — manager early access confirmed 🏢` :
                            `FlatMitra Enterprise — we'll be in touch, ${firstName} 🤝`;

    // Write to local CSV + fire emails — all in parallel
    await Promise.allSettled([
      appendToWaitlist({ name, email, phone, role, units }),

      resend.emails.send({
        from: FROM_NOTIFY,
        to: OWNER_EMAILS,
        subject: `[Waitlist] ${ROLE_LABELS[role] ?? role}: ${name}`,
        html: ownerHtml(name, email, phone, role, units),
      }),

      resend.emails.send({
        from: FROM_CONFIRM,
        to: [email],
        subject: confirmSubject,
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[waitlist] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
