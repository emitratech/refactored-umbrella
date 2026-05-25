"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#faf9f6", color: "#1a1c1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }
        .billboard { line-height: 1.0; letter-spacing: -0.04em; }
        .faq-card { transition: box-shadow 200ms ease; }
        .faq-card:hover { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
        a { transition: opacity 150ms ease; }
        a:hover { opacity: 0.8; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .tiers-grid { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          .footer-row { flex-direction: column !important; }
        }
      `}</style>

      {/* ── Nav ── */}
      <header style={{ backgroundColor: "#faf9f6", borderBottom: "1px solid rgba(199,196,215,0.2)", position: "sticky", top: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1.5rem", height: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 900, color: "#111111", textDecoration: "none", letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>FlatMitra</Link>
          <nav className="nav-links" style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/" style={{ color: "rgba(17,17,17,0.6)", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: "none", fontSize: "0.9rem" }}>Home</Link>
            <Link href="/features" style={{ color: "rgba(17,17,17,0.6)", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: "none", fontSize: "0.9rem" }}>Features</Link>
            <Link href="/legal" style={{ color: "rgba(17,17,17,0.6)", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: "none", fontSize: "0.9rem" }}>Legal</Link>
          </nav>
        </div>
        <Link href="/waitlist" style={{ backgroundColor: "#4338ca", color: "#ffffff", padding: "8px 20px", borderRadius: "4px", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
          Request Early Access
        </Link>
      </header>

      <main style={{ paddingBottom: "5rem" }}>

        {/* ── Coming Soon Hero ── */}
        <section style={{ textAlign: "center", padding: "6rem 1.5rem 5rem", maxWidth: "80rem", margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(67,56,202,0.08)", border: "1px solid rgba(67,56,202,0.2)", borderRadius: "999px", padding: "6px 20px", marginBottom: "2rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #6d28d9)", display: "inline-block" }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2a14b4" }}>Coming Soon</span>
          </div>

          <h1 className="billboard" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, color: "#1a1c1a", marginBottom: "1.5rem" }}>
            Pricing is<br />
            <span style={{ background: "linear-gradient(135deg, #4338ca, #6d28d9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>on its way.</span>
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#464554", maxWidth: "36rem", margin: "0 auto 3rem", lineHeight: 1.6 }}>
            We're finalising our plans to ensure they're genuinely valuable. Join the waitlist — early users get special priority access.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/waitlist" style={{ backgroundColor: "#4338ca", color: "#ffffff", padding: "16px 40px", borderRadius: "4px", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", boxShadow: "0 20px 25px -5px rgba(42,20,180,0.15)" }}>
              Join the Waitlist
            </Link>
            <a href="mailto:hello@emitra.dev" style={{ backgroundColor: "#ffffff", color: "#1a1c1a", padding: "16px 40px", borderRadius: "4px", fontWeight: 700, fontSize: "1.05rem", border: "1px solid rgba(199,196,215,0.4)", textDecoration: "none" }}>
              Talk to Us
            </a>
          </div>
        </section>

        {/* ── What to Expect ── */}
        <section style={{ padding: "4rem 1.5rem 6rem", maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="billboard" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#1a1c1a" }}>What to Expect</h2>
            <p style={{ color: "#464554", marginTop: "1rem" }}>The tiers we're designing around — subject to change before launch.</p>
          </div>
          <div className="tiers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { label: "Independent Owners", icon: "home", desc: "Best for individual landlords managing a handful of flats.", perks: ["Automated billing", "WhatsApp reminders", "Basic dashboard"] },
              { label: "Property Managers", icon: "apartment", desc: "For teams managing buildings or multi-unit complexes.", perks: ["All Starter features", "Employee RBAC", "Advanced reports"], highlight: true },
              { label: "Enterprise Portfolios", icon: "corporate_fare", desc: "Custom solutions for large estate portfolios.", perks: ["Unlimited buildings", "API access", "Dedicated support"] },
            ].map(tier => (
              <div key={tier.label} style={{ backgroundColor: tier.highlight ? "#4338ca" : "#ffffff", borderRadius: "12px", padding: "2rem", border: tier.highlight ? "none" : "1px solid rgba(199,196,215,0.2)", boxShadow: tier.highlight ? "0 25px 50px -12px rgba(42,20,180,0.3)" : "none" }}>
                <div style={{ width: 48, height: 48, borderRadius: "8px", backgroundColor: tier.highlight ? "rgba(255,255,255,0.15)" : "rgba(67,56,202,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <span className="material-symbols-outlined" style={{ color: tier.highlight ? "#ffffff" : "#4338ca" }}>{tier.icon}</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem", color: tier.highlight ? "#ffffff" : "#1a1c1a" }}>{tier.label}</h3>
                <p style={{ fontSize: "0.875rem", color: tier.highlight ? "rgba(255,255,255,0.8)" : "#464554", marginBottom: "1.5rem", lineHeight: 1.6 }}>{tier.desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {tier.perks.map(p => (
                    <li key={p} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span className="material-symbols-outlined" style={{ color: tier.highlight ? "#ffffff" : "#2a14b4", fontSize: "1rem" }}>check_circle</span>
                      <span style={{ fontSize: "0.875rem", color: tier.highlight ? "#ffffff" : "#464554" }}>{p}</span>
                    </li>
                  ))}
                </ul>
                {tier.highlight && (
                  <div style={{ marginTop: "1.5rem", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "6px", padding: "8px 12px", textAlign: "center" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Most Requested</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "0 1.5rem 6rem", maxWidth: "80rem", margin: "0 auto" }}>
          <h2 className="billboard" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, textAlign: "center", marginBottom: "3rem" }}>Questions Answered.</h2>
          <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", maxWidth: "64rem", margin: "0 auto" }}>
            {[
              { q: "When will pricing be announced?", a: "We're targeting our public launch soon. Waitlist members will hear first and get early-bird benefits." },
              { q: "Is there a free trial?", a: "Yes — we plan to offer early access users a generous trial period to fully evaluate the platform before committing." },
              { q: "Will my data be safe?", a: "Absolutely. All data is encrypted in transit and at rest. Each landlord's workspace is fully isolated from others." },
              { q: "Can I get a personalised demo?", a: "Yes! Email us at hello@emitra.dev and we'll set up a walkthrough tailored to your portfolio size." },
            ].map(faq => (
              <div key={faq.q} className="faq-card" style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(199,196,215,0.2)" }}>
                <h4 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.75rem" }}>{faq.q}</h4>
                <p style={{ color: "#464554", fontSize: "0.875rem", lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding: "0 1.5rem", maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "380px", background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 60%, #4338ca 100%)" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "14rem", height: "14rem", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "50%", filter: "blur(48px)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "14rem", height: "14rem", backgroundColor: "rgba(0,0,0,0.12)", borderRadius: "50%", filter: "blur(48px)" }} />
            <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "3rem 1.5rem" }}>
              <h2 className="billboard" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, color: "#ffffff", marginBottom: "1.5rem" }}>Ready to evolve?</h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", maxWidth: "36rem", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
                Get early access to FlatMitra and experience property management done right.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/waitlist" style={{ padding: "18px 48px", backgroundColor: "#ffffff", color: "#2a14b4", fontWeight: 700, borderRadius: "4px", textDecoration: "none", fontSize: "1.05rem" }}>
                  Get Early Access
                </Link>
                <Link href="/features" style={{ padding: "18px 48px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", fontWeight: 700, borderRadius: "4px", textDecoration: "none", fontSize: "1.05rem" }}>
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "#f4f3f1", padding: "4rem 1.5rem", marginTop: "5rem", borderTop: "1px solid rgba(199,196,215,0.1)" }}>
        <div className="footer-row" style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "3rem" }}>
          <div style={{ maxWidth: "18rem" }}>
            <span style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.25rem", fontWeight: 900, color: "#111111", marginBottom: "1rem" }}>FlatMitra</span>
            <p style={{ fontSize: "0.875rem", color: "#464554", lineHeight: 1.7 }}>Property management, simplified for India.</p>
            <p style={{ fontSize: "0.75rem", color: "#777586", marginTop: "1rem" }}>Powered by <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a></p>
          </div>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            {[
              { title: "Product", links: [{ label: "Features", href: "/features" }, { label: "Request Access", href: "/waitlist" }] },
              { title: "Company", links: [{ label: "Privacy Policy", href: "/legal/privacy" }, { label: "Terms of Service", href: "/legal/terms" }, { label: "Legal Hub", href: "/legal" }] },
              { title: "Support", links: [{ label: "hello@emitra.dev", href: "mailto:hello@emitra.dev" }] },
            ].map(col => (
              <div key={col.title}>
                <h5 style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1rem", color: "#464554" }}>{col.title}</h5>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {col.links.map(l => <li key={l.label}><Link href={l.href} style={{ fontSize: "0.875rem", color: "#464554", textDecoration: "none" }}>{l.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "80rem", margin: "4rem auto 0", paddingTop: "2rem", borderTop: "1px solid rgba(199,196,215,0.1)", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#777586" }}>© 2026 FlatMitra — <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> (Proprietorship). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
