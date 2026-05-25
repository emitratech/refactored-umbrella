"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const TABS = ["Billing", "Onboarding", "Reporting", "Issues"] as const;
type Tab = typeof TABS[number];

const BILLING_BULLETS = [
  "Scheduled reminders 3 days before due date",
  "One-click payment links via WhatsApp",
  "Automated digital receipts after payment",
];

const ONBOARDING_BULLETS = [
  "Aadhaar-based eKYC in under 2 minutes",
  "Digital rental agreement with eSign",
  "No app download needed on tenant side",
];

const REPORTING_BULLETS = [
  "Per-building P&L reports with one click",
  "Expense categorization for tax filing",
  "Real-time vacancy and occupancy metrics",
];

const ISSUES_BULLETS = [
  "Tenants raise tickets from their phone",
  "Track open, in-progress, and resolved issues",
  "Attach photos and assign to maintenance staff",
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Billing");

  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{`
        .editorial { line-height:1.0; letter-spacing:-0.04em; }
        .feat-card { transition:box-shadow 280ms ease,transform 280ms ease; }
        .feat-card:hover { box-shadow:0 24px 48px -8px rgba(0,0,0,0.10); transform:translateY(-3px); }

        .tab-btn { cursor:pointer; border:none; background:none; padding:14px 0; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.875rem; font-weight:700; color:#464554; border-bottom:2px solid transparent; transition:color 180ms ease,border-color 180ms ease; white-space:nowrap; }
        .tab-btn:hover { color:#4338ca; }
        .tab-btn.active { color:#4338ca; border-color:#4338ca; }

        .check-item { display:flex; align-items:flex-start; gap:0.75rem; margin-bottom:1rem; }
        .check-icon { width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg,#4338ca,#6d28d9); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }

        .bento-card { background:#fff; border:1px solid rgba(199,196,215,0.18); border-radius:16px; padding:2rem; transition:transform 240ms ease,box-shadow 240ms ease; }
        .bento-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px -8px rgba(0,0,0,0.09); }

        .step-circle { background:linear-gradient(135deg,#4338ca,#6d28d9); }

        @media (max-width:900px) {
          .feature-split { flex-direction:column!important; }
          .bento-row { grid-template-columns:1fr!important; }
          .bento-span2 { grid-column:span 1!important; }
        }
        @media (max-width:640px) {
          .tab-row { gap:1.5rem!important; }
        }
      `}</style>

      <main>
        {/* ── Hero ── */}
        <section style={{ padding: "6rem 1.5rem 3rem", maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "3rem" }}>
            <div style={{ maxWidth: "42rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca", display: "block", marginBottom: "1rem" }}>Product Features</span>
              <h1 className="editorial" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, color: "#1a1c1a", marginBottom: "1.5rem" }}>
                <span style={{ color: "#4338ca" }}>Management</span>,
                <br />Refined.
              </h1>
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", color: "#464554", lineHeight: 1.7 }}>
                A property management suite built for the modern landlord. Precision tools for billing, onboarding, and operations.
              </p>
            </div>
            {/* Right side: key stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "220px" }}>
              {[
                { val: "T+0", sub: "Instant rent settlements" },
                { val: "100%", sub: "Paperless onboarding" },
                { val: "3 mins", sub: "Average KYC completion" },
              ].map(s => (
                <div key={s.val} style={{ background: "#fff", border: "1px solid rgba(199,196,215,0.18)", borderRadius: "12px", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "#4338ca" }}>{s.val}</span>
                  <span style={{ fontSize: "0.875rem", color: "#464554", fontWeight: 500 }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tabs ── */}
        <nav aria-label="Feature sections" style={{ position: "sticky", top: "64px", zIndex: 40, backgroundColor: "rgba(250,249,246,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid rgba(199,196,215,0.18)", borderBottom: "1px solid rgba(199,196,215,0.18)" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", overflowX: "auto" }}>
            <div className="tab-row" style={{ display: "flex", gap: "2.5rem" }}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  className={`tab-btn${activeTab === tab ? " active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab);
                    const el = document.getElementById(tab.toLowerCase());
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ── BILLING ── */}
        <section id="billing" style={{ padding: "6rem 1.5rem", maxWidth: "80rem", margin: "0 auto" }}>
          <div className="feature-split" style={{ display: "flex", gap: "5rem", alignItems: "center", flexWrap: "wrap" }}>
            {/* Image */}
            <div style={{ flex: "1 1 300px", maxWidth: "480px", position: "relative" }}>
              <div style={{ position: "absolute", top: "-3rem", left: "-3rem", width: "16rem", height: "16rem", backgroundColor: "rgba(67,56,202,0.06)", borderRadius: "50%", filter: "blur(48px)" }} />
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(199,196,215,0.2)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.12)" }}>
                <Image src="/whatsapp-billing.png" alt="WhatsApp rent collection automation" width={600} height={450} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: "1.5rem", right: "-1rem", backgroundColor: "#25D366", color: "#fff", padding: "10px 16px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>check_circle</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>Rent received</span>
              </div>
            </div>
            {/* Text */}
            <div style={{ flex: "1 1 300px" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca", display: "block", marginBottom: "0.75rem" }}>Billing</span>
              <h2 className="editorial" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, marginBottom: "1.5rem" }}>Automated Rent Collection</h2>
              <p style={{ fontSize: "1.05rem", color: "#464554", marginBottom: "2rem", lineHeight: 1.7 }}>
                Eliminate the friction of rent collection. FlatMitra automatically sends personalized payment links and reminders via WhatsApp. Your tenants stay informed without any manual follow-up from you.
              </p>
              {BILLING_BULLETS.map(b => (
                <div key={b} className="check-item">
                  <div className="check-icon"><span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "0.9rem" }}>check</span></div>
                  <span style={{ fontWeight: 500, lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
              <div style={{ marginTop: "2.5rem", padding: "1.5rem", backgroundColor: "#f4f3f1", borderRadius: "12px", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {[{ val: "0%", sub: "Settlement delay" }, { val: "T+0", sub: "Payout speed" }].map(s => (
                  <div key={s.val}>
                    <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.75rem", fontWeight: 900, color: "#4338ca", lineHeight: 1 }}>{s.val}</p>
                    <p style={{ fontSize: "0.8rem", color: "#464554", fontWeight: 600, marginTop: "4px" }}>{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GETTING STARTED (simple owner onboarding) ── */}
        <section id="onboarding" style={{ padding: "6rem 1.5rem", backgroundColor: "#f4f3f1" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca" }}>Onboarding</span>
              <h2 className="editorial" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, marginTop: "0.75rem", marginBottom: "1rem" }}>
                Up and running in one conversation.
              </h2>
              <p style={{ color: "#464554", maxWidth: "34rem", margin: "0 auto", lineHeight: 1.7, fontSize: "1.05rem" }}>
                No lengthy setups, no IT teams. Our sales team walks you through everything. You verify your KYC and your properties go live the same day.
              </p>
            </div>

            {/* Split: illustration + steps */}
            <div className="feature-split" style={{ display: "flex", gap: "5rem", alignItems: "center", flexWrap: "wrap" }}>

              {/* 2D Illustration */}
              <div style={{ flex: "1 1 300px", maxWidth: "460px", position: "relative" }}>
                <div style={{ position: "absolute", top: "-2rem", left: "-2rem", width: "18rem", height: "18rem", background: "radial-gradient(circle, rgba(67,56,202,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
                <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", background: "linear-gradient(145deg, #eeedf9 0%, #f4f3f1 100%)", border: "1px solid rgba(199,196,215,0.2)", boxShadow: "0 20px 48px -8px rgba(67,56,202,0.12)" }}>
                  <Image
                    src="/sales-onboarding.png"
                    alt="FlatMitra sales team explaining the platform to a new landlord"
                    width={600}
                    height={480}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  {/* Speech bubble overlay */}
                  <div style={{ position: "absolute", top: "1.25rem", left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", border: "2px solid rgba(67,56,202,0.2)", borderRadius: "999px", padding: "6px 18px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", whiteSpace: "nowrap" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "1rem", color: "#4338ca" }}>support_agent</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1a1c1a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>FlatMitra Sales Team</span>
                  </div>
                </div>
              </div>

              {/* 4-Step flow */}
              <div style={{ flex: "1 1 300px" }}>
                {[
                  {
                    n: "01",
                    icon: "phone_in_talk",
                    title: "Talk to Sales",
                    desc: "Reach out and our team walks you through the platform. No demo videos, no forms. A real conversation.",
                    color: "#4338ca",
                  },
                  {
                    n: "02",
                    icon: "manage_accounts",
                    title: "Account Setup",
                    desc: "We configure your buildings, units, and team roles. Your workspace is ready before the call ends.",
                    color: "#6d28d9",
                  },
                  {
                    n: "03",
                    icon: "verified_user",
                    title: "KYC Verification",
                    desc: "Quick Aadhaar-based KYC for you as the property owner. Takes under 3 minutes.",
                    color: "#4338ca",
                  },
                  {
                    n: "04",
                    icon: "rocket_launch",
                    title: "You're Live",
                    desc: "Tenants are added, rent reminders start, and your dashboard shows real-time collections. Done.",
                    color: "#6d28d9",
                  },
                ].map((step, i) => (
                  <div key={step.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", marginBottom: i < 3 ? "2rem" : 0, position: "relative" }}>
                    {/* Step number + connector line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "12px", background: `linear-gradient(135deg, ${step.color}, #6d28d9)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 16px ${step.color}30` }}>
                        <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "1.25rem" }}>{step.icon}</span>
                      </div>
                      {i < 3 && (
                        <div style={{ width: 2, height: "2rem", background: "linear-gradient(180deg, rgba(67,56,202,0.3), rgba(109,40,217,0.1))", marginTop: "4px", borderRadius: "1px" }} />
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ paddingTop: "6px" }}>
                      <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#4338ca", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Step {step.n}</p>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1a1c1a", marginBottom: "0.4rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.title}</h4>
                      <p style={{ color: "#464554", lineHeight: 1.65, fontSize: "0.9375rem" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}

                {/* CTA */}
                <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="mailto:sales@emitra.dev" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#4338ca", color: "#fff", padding: "13px 28px", borderRadius: "6px", fontWeight: 700, textDecoration: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.9375rem", boxShadow: "0 8px 20px rgba(67,56,202,0.22)" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>mail</span>
                    Contact Sales
                  </a>
                  <a href="tel:+91" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#fff", color: "#4338ca", padding: "13px 28px", borderRadius: "6px", fontWeight: 700, textDecoration: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.9375rem", border: "1.5px solid rgba(67,56,202,0.25)" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>phone_in_talk</span>
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ONBOARDING ── */}
        <section style={{ backgroundColor: "#f4f3f1", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <div className="feature-split" style={{ display: "flex", gap: "5rem", alignItems: "center", flexWrap: "wrap", flexDirection: "row-reverse" }}>
              {/* Image */}
              <div style={{ flex: "1 1 300px", maxWidth: "480px", position: "relative" }}>
                <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "16rem", height: "16rem", backgroundColor: "rgba(67,56,202,0.06)", borderRadius: "50%", filter: "blur(48px)" }} />
                <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(199,196,215,0.2)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.12)" }}>
                  <Image src="/phonepay-onboarding.png" alt="Instant PhonePe payment integration" width={600} height={450} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                {/* Floating badge */}
                <div style={{ position: "absolute", top: "1.5rem", left: "-1rem", backgroundColor: "#fff", padding: "10px 16px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", border: "1px solid rgba(199,196,215,0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.1rem", color: "#4338ca" }}>verified</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a1c1a" }}>KYC Verified</span>
                </div>
              </div>
              {/* Text */}
              <div style={{ flex: "1 1 300px" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca", display: "block", marginBottom: "0.75rem" }}>Payments</span>
                <h2 className="editorial" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, marginBottom: "1.5rem" }}>Instant Payouts via PhonePe</h2>
                <p style={{ fontSize: "1.05rem", color: "#464554", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Deep integration with PhonePe Business ensures funds are settled into your account in real-time. No 2-day waiting periods, no reconciliation headaches.
                </p>
                {ONBOARDING_BULLETS.map(b => (
                  <div key={b} className="check-item">
                    <div className="check-icon"><span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "0.9rem" }}>check</span></div>
                    <span style={{ fontWeight: 500, lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "2.5rem", backgroundColor: "#4338ca", color: "#fff", padding: "14px 32px", borderRadius: "6px", fontWeight: 700, textDecoration: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Get Early Access <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── REPORTING ── */}
        <section id="reporting" style={{ padding: "6rem 1.5rem", maxWidth: "80rem", margin: "0 auto" }}>
          <div className="feature-split" style={{ display: "flex", gap: "5rem", alignItems: "center", flexWrap: "wrap" }}>
            {/* Visual Cards */}
            <div style={{ flex: "1 1 300px", maxWidth: "480px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { icon: "badge", title: "Property Manager", sub: "Full Ops Access", color: "#4338ca" },
                { icon: "engineering", title: "Support Staff", sub: "Issues Only", color: "#6d28d9", offset: true },
                { icon: "analytics", title: "Finance View", sub: "Reports and P&L", color: "#2a14b4" },
                { icon: "shield", title: "Audit Log", sub: "All actions tracked", color: "#5b21b6", offset: true },
              ].map(r => (
                <div key={r.title} className="feat-card bento-card" style={{ transform: (r as any).offset ? "translateY(1.5rem)" : "none" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "8px", backgroundColor: r.color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <span className="material-symbols-outlined" style={{ color: r.color }}>{r.icon}</span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1a1c1a", marginBottom: "4px" }}>{r.title}</p>
                  <p style={{ fontSize: "0.75rem", color: "#464554" }}>{r.sub}</p>
                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ height: "5px", backgroundColor: "#efeeeb", borderRadius: "999px" }} />
                    <div style={{ height: "5px", backgroundColor: r.color, borderRadius: "999px", width: "65%", opacity: 0.4 }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Text */}
            <div style={{ flex: "1 1 300px" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca", display: "block", marginBottom: "0.75rem" }}>Reporting</span>
              <h2 className="editorial" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, marginBottom: "1.5rem" }}>Reporting, Roles, and Access</h2>
              <p style={{ fontSize: "1.05rem", color: "#464554", marginBottom: "2rem", lineHeight: 1.7 }}>
                Assign specific buildings to designated managers. Role-Based Access Control ensures your staff only sees what they need, keeping financial data secure and auditable.
              </p>
              {REPORTING_BULLETS.map(b => (
                <div key={b} className="check-item">
                  <div className="check-icon"><span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "0.9rem" }}>check</span></div>
                  <span style={{ fontWeight: 500, lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ISSUES BENTO ── */}
        <section id="issues" style={{ backgroundColor: "rgba(233,232,229,0.3)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca" }}>Issues</span>
              <h2 className="editorial" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, marginBottom: "1rem", marginTop: "0.75rem" }}>Issue and Maintenance Tracking</h2>
              <p style={{ color: "#464554", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.6 }}>A unified hub for the modern property enterprise.</p>
            </div>

            <div className="bento-row" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem" }}>

              {/* Issue Tracking — BIG primary card (spans left) */}
              <div className="feat-card" style={{ background: "linear-gradient(135deg,#4338ca 0%,#6d28d9 100%)", padding: "2rem", borderRadius: "16px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span className="material-symbols-outlined" style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>support_agent</span>
                  <h3 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.75rem" }}>Issue Tracking</h3>
                  <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.65, marginBottom: "1.5rem", fontSize: "0.9375rem" }}>Tenants raise tickets from their phone. Your team resolves and tracks repairs in one place — no WhatsApp groups, no missed calls.</p>
                  {ISSUES_BULLETS.map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "0.875rem" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", marginTop: "2px", flexShrink: 0 }}>check_circle</span>
                      <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.55 }}>{b}</span>
                    </div>
                  ))}
                </div>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.875rem", fontWeight: 700, color: "#fff", textDecoration: "none", marginTop: "2rem" }}>
                  Get access <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
                </Link>
              </div>

              {/* Financial Reporting — smaller supporting card */}
              <div className="feat-card bento-card">
                <span className="material-symbols-outlined" style={{ color: "#4338ca", fontSize: "2rem", display: "block", marginBottom: "1rem" }}>analytics</span>
                <h3 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.5rem" }}>Detailed Financial Reporting</h3>
                <p style={{ color: "#464554", marginBottom: "1.5rem" }}>Tax-ready reports with a single click. Track expenses, net revenue, and vacancy rates across your entire portfolio.</p>
                <div style={{ height: "8rem", backgroundColor: "#f4f3f1", borderRadius: "8px", overflow: "hidden", position: "relative", marginBottom: "1.5rem" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 1rem", gap: "0.5rem" }}>
                    {[40, 60, 90, 70, 85, 55, 95].map((h, i) => (
                      <div key={i} style={{ flex: 1, background: "linear-gradient(180deg, #6d28d9, #4338ca)", height: `${h}%`, borderRadius: "4px 4px 0 0", opacity: 0.5 + i * 0.04 }} />
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  {REPORTING_BULLETS.slice(0, 2).map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "0.75rem" }}>check</span>
                      </div>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#464554" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "64rem", margin: "0 auto", background: "linear-gradient(135deg,#4338ca 0%,#6d28d9 60%,#4338ca 100%)", borderRadius: "20px", padding: "clamp(2.5rem, 6vw, 5rem)", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "16rem", height: "16rem", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(64px)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "16rem", height: "16rem", backgroundColor: "rgba(0,0,0,0.12)", borderRadius: "50%", filter: "blur(64px)" }} />
            <div style={{ position: "relative", zIndex: 10 }}>
              <h2 className="editorial" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, color: "#fff", marginBottom: "1.5rem" }}>Ready to evolve?</h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", maxWidth: "36rem", margin: "0 auto 3rem", lineHeight: 1.6 }}>
                FlatMitra is launching soon. Get started free and get early access.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/login" style={{ backgroundColor: "#fff", color: "#2a14b4", padding: "18px 40px", borderRadius: "6px", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none" }}>
                  Get Started
                </Link>
                <a href="mailto:hello@emitra.dev" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "18px 40px", borderRadius: "6px", fontWeight: 700, textDecoration: "none", fontSize: "1.05rem" }}>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
