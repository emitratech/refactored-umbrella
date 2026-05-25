"use client";

import Link from "next/link";
import { useState } from "react";

type Step = "form" | "success";
type Role = "landlord" | "manager" | "other";

export default function WaitlistPage() {
  const [step, setStep] = useState<Step>("form");
  const [role, setRole] = useState<Role | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [units, setUnits] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (!phone.match(/^[6-9]\d{9}$/)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!role) e.role = "Please select your role";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, role, units }),
      });
    } catch {
      // Silently continue — email failure shouldn't block the user
    }
    setLoading(false);
    setStep("success");
  };

  const roles: { value: Role; label: string; icon: string }[] = [
    { value: "landlord", label: "Independent Landlord", icon: "home" },
    { value: "manager", label: "Property Manager", icon: "apartment" },
    { value: "other", label: "Enterprise / Other", icon: "corporate_fare" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf9f6", position: "relative", overflow: "hidden", fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* ── Soft orbs (light palette) ── */
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-40px) scale(1.06)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-35px,30px) scale(0.96)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,35px) scale(1.04)} }
        .orb-a { animation: floatA 14s ease-in-out infinite; }
        .orb-b { animation: floatB 18s ease-in-out infinite; }
        .orb-c { animation: floatC 11s ease-in-out infinite; }

        /* ── Glass card (light mode) ── */
        .glass-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 8px 40px rgba(67,56,202,0.08), 0 1px 3px rgba(0,0,0,0.05);
        }

        /* ── Input ── */
        .field-input {
          background: #ffffff;
          border: 1.5px solid rgba(199,196,215,0.5);
          color: #1a1c1a;
          border-radius: 8px;
          padding: 13px 16px;
          font-size: 0.9375rem;
          font-family: 'Manrope', sans-serif;
          width: 100%;
          outline: none;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .field-input::placeholder { color: rgba(70,69,84,0.4); }
        .field-input:focus { border-color: #4338ca; box-shadow: 0 0 0 3px rgba(67,56,202,0.1); }
        .field-input.err { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.08); }

        /* ── Role button ── */
        .role-btn {
          background: #ffffff;
          border: 1.5px solid rgba(199,196,215,0.4);
          border-radius: 10px;
          padding: 14px 12px;
          cursor: pointer;
          transition: all 200ms ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1 1 100px;
          color: #464554;
        }
        .role-btn:hover { border-color: rgba(67,56,202,0.4); background: rgba(67,56,202,0.04); }
        .role-btn.active {
          border-color: #4338ca;
          background: rgba(67,56,202,0.06);
          color: #4338ca;
          box-shadow: 0 0 0 3px rgba(67,56,202,0.1);
        }

        /* ── Submit button ── */
        .submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease;
          background: linear-gradient(135deg, #4338ca, #6d28d9);
          color: #fff;
          box-shadow: 0 8px 24px rgba(67,56,202,0.25);
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(67,56,202,0.35); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        /* shimmer */
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 550ms ease;
        }
        .submit-btn:hover::before { left: 100%; }

        /* ── Spinner ── */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 700ms linear infinite; }

        /* ── Fade up ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 500ms ease-out forwards; }
        .d1 { animation-delay:80ms; opacity:0; }
        .d2 { animation-delay:180ms; opacity:0; }
        .d3 { animation-delay:280ms; opacity:0; }

        /* ── Error text ── */
        .err-text { color: #dc2626; font-size: 0.75rem; margin-top: 4px; }

        /* ── Success pop ── */
        @keyframes pop { 0%{transform:scale(0)} 60%{transform:scale(1.12)} 100%{transform:scale(1)} }
        .pop { animation: pop 600ms cubic-bezier(0.34,1.56,0.64,1) forwards; }

        /* ── Nav ── */
        .nav-link { color: rgba(17,17,17,0.55); font-weight: 700; text-decoration: none; font-size: 0.875rem; transition: color 150ms ease; }
        .nav-link:hover { color: #4338ca; }

        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .role-row { flex-direction: column !important; }
        }
      `}</style>

      {/* ── Soft background orbs (light, desaturated) ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div className="orb-a" style={{ position: "absolute", top: "-8%", left: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", filter: "blur(48px)" }} />
        <div className="orb-b" style={{ position: "absolute", bottom: "-12%", right: "-8%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 65%)", filter: "blur(56px)" }} />
        <div className="orb-c" style={{ position: "absolute", top: "45%", left: "60%", width: "30vw", height: "30vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(67,56,202,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />
        {/* Subtle dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(67,56,202,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      {/* ── Nav ── */}
      <header style={{ position: "relative", zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2rem", height: "64px", backgroundColor: "rgba(250,249,246,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(199,196,215,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.25rem", fontWeight: 900, color: "#111111", textDecoration: "none", letterSpacing: "-0.02em" }}>
            FlatMitra
          </Link>
          <nav className="nav-links" style={{ display: "flex", gap: "1.5rem" }}>
            {[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }, { label: "Legal", href: "/legal" }].map(l => (
              <Link key={l.label} href={l.href} className="nav-link">{l.label}</Link>
            ))}
          </nav>
        </div>
        <Link href="/" style={{ color: "#4338ca", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none" }}>← Back to site</Link>
      </header>

      {/* ── Main ── */}
      <main style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 64px)", padding: "3rem 1.5rem" }}>

        {step === "form" && (
          <div style={{ width: "100%", maxWidth: "500px" }}>

            {/* ── Left side: headline ── */}
            <div className="fade-up" style={{ textAlign: "center", marginBottom: "2rem" }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(67,56,202,0.07)", border: "1px solid rgba(67,56,202,0.18)", borderRadius: "999px", padding: "5px 16px", marginBottom: "1.5rem" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#6d28d9)", display: "inline-block" }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4338ca" }}>Early Access — Limited Spots</span>
              </div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2.25rem, 6vw, 3.5rem)", fontWeight: 900, color: "#1a1c1a", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "0.75rem" }}>
                Join the Waitlist.
              </h1>
              <p style={{ color: "#464554", fontSize: "1rem", lineHeight: 1.65, maxWidth: "360px", margin: "0 auto" }}>
                FlatMitra is launching soon. Reserve your spot and get priority access to India's smartest property platform.
              </p>
            </div>

            {/* ── Glass Form Card ── */}
            <div className="glass-card fade-up d1" style={{ borderRadius: "20px", padding: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#464554", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>Your Name</label>
                  <input className={`field-input${errors.name ? " err" : ""}`} type="text" placeholder="Rajesh Sharma" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
                  {errors.name && <p className="err-text">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#464554", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>Email Address</label>
                  <input className={`field-input${errors.email ? " err" : ""}`} type="email" placeholder="rajesh@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                  {errors.email && <p className="err-text">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#464554", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>WhatsApp Number</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#464554", fontSize: "0.9375rem", fontWeight: 600 }}>+91</span>
                    <input className={`field-input${errors.phone ? " err" : ""}`} type="tel" placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} style={{ paddingLeft: "48px" }} autoComplete="tel" />
                  </div>
                  {errors.phone && <p className="err-text">{errors.phone}</p>}
                </div>

                {/* Role */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#464554", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>I am a…</label>
                  <div className="role-row" style={{ display: "flex", gap: "0.75rem" }}>
                    {roles.map(r => (
                      <button key={r.value} type="button" className={`role-btn${role === r.value ? " active" : ""}`} onClick={() => setRole(r.value)}>
                        <span className="material-symbols-outlined" style={{ fontSize: "1.4rem" }}>{r.icon}</span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, textAlign: "center", lineHeight: 1.3 }}>{r.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.role && <p className="err-text">{errors.role}</p>}
                </div>

                {/* Units (optional) */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#464554", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>
                    Units you manage <span style={{ color: "#999", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <input className="field-input" type="number" placeholder="e.g. 12" min="1" value={units} onChange={e => setUnits(e.target.value)} />
                </div>

                {/* Submit */}
                <button className="submit-btn" type="submit" disabled={loading} style={{ marginTop: "0.25rem" }}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Securing your spot…
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      Reserve My Spot
                      <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>arrow_forward</span>
                    </span>
                  )}
                </button>

                <p style={{ fontSize: "0.75rem", color: "#999", textAlign: "center", lineHeight: 1.6 }}>
                  No spam. No fees required. You'll hear from us first when we launch.
                </p>
              </form>
            </div>

            {/* Trust signals */}
            <div className="fade-up d2" style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "1.75rem", flexWrap: "wrap" }}>
              {[{ icon: "lock", label: "Data encrypted" }, { icon: "notifications_off", label: "Zero spam" }, { icon: "cancel", label: "Cancel anytime" }].map(t => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#777586" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "0.9rem" }}>{t.icon}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Success State ── */}
        {step === "success" && (
          <div className="fade-up" style={{ textAlign: "center", maxWidth: "440px" }}>
            <div className="pop" style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", boxShadow: "0 0 48px rgba(67,56,202,0.28)" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "2.75rem", color: "#ffffff", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 900, color: "#1a1c1a", lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
              You're on the list!
            </h1>
            <p style={{ color: "#464554", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Thanks, <strong style={{ color: "#1a1c1a" }}>{name.split(" ")[0]}</strong>! We'll reach out on <strong style={{ color: "#1a1c1a" }}>+91 {phone}</strong> as soon as FlatMitra goes live.
            </p>
            <div className="glass-card" style={{ borderRadius: "14px", padding: "1.5rem", marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.7rem", color: "#777586", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Registered Details</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[{ label: "Name", val: name }, { label: "Email", val: email }, { label: "Role", val: roles.find(r => r.value === role)?.label ?? role }].map(d => (
                  <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(199,196,215,0.15)" }}>
                    <span style={{ fontSize: "0.8rem", color: "#777586" }}>{d.label}</span>
                    <span style={{ fontSize: "0.875rem", color: "#1a1c1a", fontWeight: 700 }}>{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" style={{ padding: "13px 28px", backgroundColor: "#ffffff", color: "#1a1c1a", borderRadius: "6px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", border: "1px solid rgba(199,196,215,0.4)" }}>
                ← Back to Home
              </Link>
              <Link href="/features" style={{ padding: "13px 28px", background: "linear-gradient(135deg, #4338ca, #6d28d9)", color: "#ffffff", borderRadius: "6px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                Explore Features
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* ── Minimal footer ── */}
      <footer style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "1.5rem", borderTop: "1px solid rgba(199,196,215,0.15)" }}>
        <p style={{ fontSize: "0.75rem", color: "#777586" }}>© 2026 FlatMitra — <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> (Proprietorship). <Link href="/legal/privacy" style={{ color: "#777586", textDecoration: "underline" }}>Privacy</Link> · <Link href="/legal/terms" style={{ color: "#777586", textDecoration: "underline" }}>Terms</Link></p>
      </footer>
    </div>
  );
}
