"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const POPUP_MESSAGES = [
  { name: "Ramesh S.", city: "Pune", action: "just signed up" },
  { name: "Priya M.", city: "Mumbai", action: "requested early access" },
  { name: "Anil K.", city: "Hyderabad", action: "just signed up" },
  { name: "Sonia R.", city: "Bengaluru", action: "requested early access" },
  { name: "Deepak V.", city: "Delhi NCR", action: "just signed up" },
];

const FACTS = [
  { stat: "11 Cr+", label: "Rental households in India", icon: "home_work" },
  { stat: "82%", label: "Landlords still use pen and paper", icon: "edit_note" },
  { stat: "3.5 days", label: "Average time wasted chasing rent manually", icon: "schedule" },
  { stat: "Rs 2,400 Cr", label: "Lost annually to rent collection inefficiency", icon: "currency_rupee" },
];

const STEPS = [
  { n: "1", title: "Paste QR code on door", desc: "Download and print your unique FlatMitra QR code and place it on the unit door for instant tenant access." },
  { n: "2", title: "Tenant scans and joins", desc: "Tenants complete KYC and sign the agreement digitally. No app download needed on their end." },
  { n: "3", title: "Collect rent automatically", desc: "Our system sends reminders and collects rent directly into your bank account. Dashboard updates in real-time." },
];

export default function HomePage() {
  const [popupIdx, setPopupIdx] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 3200);
    };
    // First popup after 2s, then every 6s
    const first = setTimeout(() => {
      show();
      const interval = setInterval(() => {
        setPopupIdx(i => (i + 1) % POPUP_MESSAGES.length);
        show();
      }, 6000);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(first);
  }, []);

  const popup = POPUP_MESSAGES[popupIdx];
  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{`
        .headline { line-height: 1.0; letter-spacing: -0.04em; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .dot-pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 550ms ease-out forwards; }
        .d1{animation-delay:80ms;opacity:0} .d2{animation-delay:180ms;opacity:0} .d3{animation-delay:280ms;opacity:0} .d4{animation-delay:380ms;opacity:0}

        .btn-primary { display:inline-block; background:#4338ca; color:#fff; padding:16px 40px; border-radius:6px; font-weight:700; font-size:1.05rem; text-decoration:none; font-family:'Plus Jakarta Sans',sans-serif; box-shadow:0 16px 32px -4px rgba(42,20,180,0.22); transition:transform 200ms cubic-bezier(0.34,1.56,0.64,1),box-shadow 200ms ease; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 24px 40px -4px rgba(42,20,180,0.35); opacity:1; }
        .btn-ghost { display:inline-block; background:#fff; color:#1a1c1a; padding:16px 40px; border-radius:6px; font-weight:700; font-size:1.05rem; border:1px solid rgba(199,196,215,0.5); text-decoration:none; font-family:'Plus Jakarta Sans',sans-serif; transition:transform 200ms ease,box-shadow 200ms ease; }
        .btn-ghost:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(0,0,0,0.07); opacity:1; }

        .fact-card { background:#fff; border:1px solid rgba(199,196,215,0.18); border-radius:16px; padding:2rem; transition:transform 240ms ease,box-shadow 240ms ease; }
        .fact-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px -8px rgba(0,0,0,0.10); }

        .feat-card { transition:box-shadow 280ms ease,transform 280ms ease; }
        .feat-card:hover { box-shadow:0 24px 48px -8px rgba(0,0,0,0.10); transform:translateY(-3px); }

        .step-circle { background:linear-gradient(135deg,#4338ca,#6d28d9); }

        /* Social proof popup */
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(8px)} }
        .popup-in { animation: slideUp 400ms cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .popup-out { animation: slideDown 300ms ease-in forwards; }

        @media (max-width:900px) {
          .hero-btns { flex-direction:column!important; align-items:stretch!important; }
          .hero-btns a { text-align:center; }
          .hero-split { flex-direction:column!important; }
          .facts-grid { grid-template-columns:1fr 1fr!important; }
          .bento-grid { grid-template-columns:1fr!important; }
          .step-split { flex-direction:column!important; }
        }
        @media (max-width:540px) {
          .facts-grid { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* ── Coming Soon Banner ── */}
      <div style={{ background: "linear-gradient(90deg,#4338ca,#6d28d9)", color: "#fff", textAlign: "center", padding: "10px 1.5rem", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.04em" }}>
        <span role="img" aria-label="rocket">&#128640;</span>&nbsp; FlatMitra is launching soon. Be among the first to get access.&nbsp;
        <Link href="/login" style={{ color: "#fff", textDecoration: "underline" }}>Get started free</Link>
      </div>

      <main>
        {/* ── Hero ── SPLIT LAYOUT ── */}
        <section style={{ padding: "4rem 1.5rem 5rem", overflow: "hidden" }}>
          <div className="hero-split" style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>

            {/* LEFT: Text column */}
            <div style={{ flex: "1 1 340px", maxWidth: "560px" }}>
              {/* Badge */}
              <div className="fade-in" style={{ marginBottom: "1.5rem", padding: "6px 16px", backgroundColor: "#e9e8e5", borderRadius: "999px", border: "1px solid rgba(199,196,215,0.3)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span className="dot-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#6d28d9)", display: "inline-block" }} />
                <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#464554" }}>Now accepting early access requests</span>
              </div>

              <h1 className="headline fade-in d1" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900, color: "#1a1c1a", marginBottom: "1.5rem", lineHeight: 1.02 }}>
                The Smartest <br/>
                <span style={{ color: "#4338ca" }}>Property Management</span>
                <br />Tool for India.
              </h1>

              <p className="fade-in d2" style={{ fontSize: "clamp(1rem, 1.5vw, 1.1rem)", color: "#464554", marginBottom: "2.5rem", fontWeight: 500, lineHeight: 1.7, maxWidth: "38rem" }}>
                Looking for a reliable <strong>flat management tool</strong>? FlatMitra (by <strong>Flat eMitra</strong>) simplifies rent collection, KYC, and WhatsApp automation in one clean platform.
              </p>

              <div className="hero-btns fade-in d3" style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                <Link href="/login" className="btn-primary">Get Started Free</Link>
                <Link href="/features" className="btn-ghost">Explore Features</Link>
              </div>

              {/* Social proof popup — always rendered, toggled by opacity to prevent layout shift */}
              <div style={{ height: "40px", display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#fff",
                    border: "1px solid rgba(199,196,215,0.3)",
                    borderRadius: "999px",
                    padding: "6px 14px 6px 8px",
                    boxShadow: "0 6px 20px rgba(67,56,202,0.1)",
                    opacity: popupVisible ? 1 : 0,
                    visibility: popupVisible ? "visible" : "hidden",
                    transition: "opacity 400ms cubic-bezier(0.34,1.56,0.64,1), visibility 400ms",
                    transform: popupVisible ? "translateY(0)" : "translateY(6px)",
                  }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "0.75rem" }}>person</span>
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1a1c1a", whiteSpace: "nowrap" }}>
                    <strong>{popup.name}</strong> from {popup.city} {popup.action}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "#777586", whiteSpace: "nowrap" }}>just now</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Illustration */}
            <div className="fade-in d4" style={{ flex: "1 1 320px", maxWidth: "560px", position: "relative" }}>
              {/* Glow orb behind */}
              <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "80%", background: "radial-gradient(circle, rgba(67,56,202,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", background: "linear-gradient(145deg,#eeedf9 0%,#f0eff8 100%)", border: "1px solid rgba(199,196,215,0.2)", boxShadow: "0 24px 56px -12px rgba(67,56,202,0.18)" }}>
                <Image
                  src="/hero-landlord.png"
                  alt="Indian landlord managing properties on FlatMitra dashboard"
                  width={700}
                  height={580}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                />
              </div>
              {/* Floating stat chips */}
              <div style={{ position: "absolute", top: "12%", right: "-1rem", backgroundColor: "#fff", padding: "8px 14px", borderRadius: "10px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", border: "1px solid rgba(199,196,215,0.2)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "1rem", color: "#4338ca" }}>currency_rupee</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1a1c1a" }}>Rent collected</span>
              </div>
              <div style={{ position: "absolute", bottom: "14%", left: "-1rem", backgroundColor: "#4338ca", padding: "8px 14px", borderRadius: "10px", boxShadow: "0 8px 20px rgba(67,56,202,0.25)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "1rem", color: "#fff" }}>verified_user</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>KYC verified</span>
              </div>
            </div>

          </div>
        </section>

        {/* ── India Rental Market Fun Facts ── */}
        <section style={{ padding: "6rem 1.5rem", backgroundColor: "#f4f3f1" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca" }}>The Indian Rental Reality</span>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: "0.75rem", color: "#1a1c1a" }}>
                Why property management needs a rethink.
              </h2>
              <p style={{ color: "#464554", marginTop: "1rem", fontSize: "1rem", maxWidth: "36rem", margin: "1rem auto 0", lineHeight: 1.6 }}>
                Millions of landlords across India are still managing crores of rupees on WhatsApp notes and paper registers.
              </p>
            </div>

            <div className="facts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
              {FACTS.map((f) => (
                <div key={f.stat} className="fact-card">
                  <span className="material-symbols-outlined" style={{ fontSize: "1.75rem", color: "#4338ca", display: "block", marginBottom: "1rem" }}>{f.icon}</span>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 900, color: "#4338ca", lineHeight: 1.1, marginBottom: "0.5rem" }}>{f.stat}</p>
                  <p style={{ fontSize: "0.875rem", color: "#464554", fontWeight: 500, lineHeight: 1.5 }}>{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Bento ── */}
        <section style={{ padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ maxWidth: "36rem" }}>
                <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", fontWeight: 900, color: "#1a1c1a", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
                  A property management tool to scale your portfolio.
                </h2>
                <p style={{ color: "#464554", fontSize: "1.05rem", lineHeight: 1.6 }}>
                  Built for the unique challenges of the Indian rental market, from cash management to WhatsApp follow-ups.
                </p>
              </div>
              <Link href="/features" style={{ color: "#2a14b4", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Explore all features <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.5rem" }}>
              {[
                { icon: "account_balance_wallet", title: "Auto-Pilot Collections", desc: "Collect rent through PhonePe, GPay, or NetBanking. Automated receipts sent via WhatsApp instantly.", tags: ["PhonePe", "WhatsApp"] },
                { icon: "verified_user", title: "Digital Tenant Onboarding", desc: "KYC and eSign for rental agreements in minutes. No chasing physical documents or stamp paper.", tags: ["Aadhaar KYC", "Digital Sign"] },
                { icon: "analytics", title: "Building-wise P&L", desc: "Track expenses, maintenance costs, and net profit for every building in your portfolio with one tap.", tags: ["Real-time", "Tax Reports"] },
              ].map(f => (
                <div key={f.title} className="feat-card" style={{ backgroundColor: "#ffffff", padding: "2.5rem", borderRadius: "16px", border: "1px solid rgba(199,196,215,0.12)" }}>
                  <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#4338ca,#6d28d9)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "1.75rem" }}>{f.icon}</span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>{f.title}</h3>
                  <p style={{ color: "#464554", lineHeight: 1.7, marginBottom: "1.5rem" }}>{f.desc}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {f.tags.map(t => <span key={t} style={{ padding: "4px 12px", backgroundColor: "rgba(67,56,202,0.08)", color: "#4338ca", fontSize: "0.7rem", fontWeight: 700, borderRadius: "4px" }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section style={{ padding: "6rem 1.5rem", backgroundColor: "#f4f3f1" }}>
          <div className="step-split" style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", gap: "5rem", alignItems: "center", flexWrap: "wrap" }}>
            {/* Image */}
            <div style={{ flex: "1 1 300px", maxWidth: "480px", position: "relative" }}>
              <div style={{ position: "absolute", top: "-2rem", left: "-2rem", width: "14rem", height: "14rem", background: "rgba(67,56,202,0.06)", borderRadius: "50%", filter: "blur(56px)" }} />
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(199,196,215,0.2)", boxShadow: "0 20px 48px -12px rgba(0,0,0,0.14)", background: "linear-gradient(145deg,#eeedf9,#f4f3f1)" }}>
                <Image
                  src="/qr-door-tenant.png"
                  alt="Tenant scanning QR code on apartment door to join FlatMitra"
                  width={600}
                  height={450}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
            {/* Steps */}
            <div style={{ flex: "1 1 300px" }}>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "3rem" }}>
                Set up your property in 3 simple steps.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {STEPS.map(s => (
                  <div key={s.n} style={{ display: "flex", gap: "1.5rem" }}>
                    <div className="step-circle" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "1rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.n}</div>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h4>
                      <p style={{ color: "#464554", lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── About Us ── */}
        <section id="about" style={{ padding: "6rem 1.5rem", backgroundColor: "#fff" }}>
          <div style={{ maxWidth: "64rem", margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#4338ca" }}>About Us</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: "0.75rem", color: "#1a1c1a", marginBottom: "1.5rem" }}>
              Built for India's landlords.
            </h2>
            <p style={{ color: "#464554", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              FlatMitra is powered by <strong>eMitra Technologies</strong>. Our mission is to digitize and simplify property management for millions of Indian landlords who still rely on pen and paper. We understand that managing tenants, tracking payments, and maintaining records manually is outdated and inefficient. That's why we've built a platform that brings transparency, automation, and ease directly to your fingertips.
            </p>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "64rem", margin: "0 auto", background: "linear-gradient(135deg,#4338ca 0%,#6d28d9 60%,#4338ca 100%)", borderRadius: "20px", padding: "clamp(2.5rem, 6vw, 5rem)", textAlign: "center", color: "#fff", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "18rem", height: "18rem", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "50%", transform: "translate(50%,-50%)", filter: "blur(56px)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "18rem", height: "18rem", backgroundColor: "rgba(0,0,0,0.12)", borderRadius: "50%", transform: "translate(-50%,50%)", filter: "blur(56px)" }} />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: "1.5rem", position: "relative", zIndex: 10, color: "#fff" }}>
              Ready to reclaim your time?
            </h2>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", color: "rgba(255,255,255,0.85)", marginBottom: "3rem", maxWidth: "36rem", margin: "0 auto 3rem", position: "relative", zIndex: 10, lineHeight: 1.6 }}>
              FlatMitra is launching soon. Get early access and be first to experience the ultimate flat management tool.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 10 }}>
              <Link href="/login" style={{ backgroundColor: "#fff", color: "#2a14b4", padding: "16px 40px", borderRadius: "6px", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}>
                Get Early Access
              </Link>
              <a href="mailto:hello@emitra.dev" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", padding: "16px 40px", borderRadius: "6px", fontWeight: 700, fontSize: "1.05rem", border: "1px solid rgba(255,255,255,0.22)", textDecoration: "none" }}>
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
