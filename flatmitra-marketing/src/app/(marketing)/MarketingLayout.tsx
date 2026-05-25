"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Features", href: "/features" },
  { label: "About Us", href: "/#about" },
  { label: "Legal",    href: "/legal" },
];

const FOOTER_COLS = [
  {
    title: "Platform",
    links: [
      { label: "Features",        href: "/features" },
      { label: "Request Access",  href: "/waitlist" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Help Center", href: "mailto:support@emitra.dev" }],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",         href: "/#about" },
      { label: "Privacy Policy",   href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
    ],
  },
];

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24; font-family:'Material Symbols Outlined'; }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        body { font-family: 'Manrope', sans-serif; background: #faf9f6; color: #1a1c1a; -webkit-font-smoothing: antialiased; }
        h1,h2,h3,h4,h5,h6 { font-family: 'Plus Jakarta Sans', sans-serif; }
        a { transition: opacity 160ms ease, color 160ms ease; }
        main { animation: pageFade 350ms ease-out both; }
        @keyframes pageFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        /* Desktop nav links */
        .mkt-nav-link { color: rgba(17,17,17,0.55); font-weight: 700; text-decoration: none; font-size: 0.875rem; padding-bottom: 2px; border-bottom: 2px solid transparent; transition: color 150ms ease, border-color 150ms ease; font-family: 'Plus Jakarta Sans', sans-serif; }
        .mkt-nav-link:hover  { color: #4338ca; border-color: rgba(67,56,202,0.3); opacity: 1; }
        .mkt-nav-link.active { color: #4338ca; border-color: #4338ca; }

        /* CTA button */
        .mkt-btn-primary { display: inline-block; background: #4338ca; color: #fff; padding: 9px 20px; border-radius: 6px; font-weight: 700; font-size: 0.875rem; text-decoration: none; font-family: 'Plus Jakarta Sans', sans-serif; transition: transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease; box-shadow: 0 4px 16px rgba(67,56,202,0.2); }
        .mkt-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(67,56,202,0.3); opacity: 1; }

        /* Footer */
        .footer-link { font-size: 0.875rem; color: #464554; text-decoration: none; transition: color 150ms ease; }
        .footer-link:hover { color: #4338ca; opacity: 1; }

        /* Hamburger button */
        .ham-btn { display: none; background: none; border: none; cursor: pointer; padding: 8px; border-radius: 6px; transition: background 150ms ease; }
        .ham-btn:hover { background: rgba(67,56,202,0.07); }

        /* Mobile drawer */
        @keyframes menuSlideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .mobile-menu { animation: menuSlideDown 220ms ease-out forwards; }

        /* Hide desktop links / show hamburger on mobile */
        @media (max-width: 768px) {
          .mkt-nav-links  { display: none !important; }
          .mkt-cta-desktop { display: none !important; }
          .ham-btn         { display: flex !important; align-items: center; justify-content: center; }
        }
        @media (min-width: 769px) {
          .ham-btn { display: none !important; }
        }

        /* Footer responsive */
        @media (max-width: 640px) {
          .footer-grid  { grid-template-columns: 1fr !important; }
          .footer-links { flex-direction: column !important; gap: 1rem !important; }
        }
      `}</style>

      {/* ── Sticky Header ── */}
      <header style={{
        backgroundColor: "rgba(250,249,246,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(199,196,215,0.18)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1.5rem", height: "64px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 900, color: "#111111", textDecoration: "none", letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              FlatMitra
            </Link>
            {/* Desktop nav */}
            <nav className="mkt-nav-links" style={{ display: "flex", gap: "1.75rem" }}>
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} className={`mkt-nav-link${path === l.href ? " active" : ""}`}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop CTA */}
          <Link href="/waitlist" className="mkt-btn-primary mkt-cta-desktop">Request Early Access</Link>

          {/* Hamburger (mobile only) */}
          <button
            className="ham-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            {open ? (
              <span className="material-symbols-outlined" style={{ fontSize: "1.5rem", color: "#1a1c1a" }}>close</span>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: "1.5rem", color: "#1a1c1a" }}>menu</span>
            )}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        {open && (
          <div
            className="mobile-menu"
            style={{
              position: "absolute",
              top: "64px",
              left: 0,
              width: "100%",
              borderTop: "1px solid rgba(199,196,215,0.2)",
              backgroundColor: "#faf9f6",
              padding: "1.25rem 1.5rem 1.75rem",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {NAV_LINKS.filter(l => l.href !== path).map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(199,196,215,0.15)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#1a1c1a",
                    textDecoration: "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {l.label}
                  <span className="material-symbols-outlined" style={{ fontSize: "1.1rem", color: "#aaa" }}>chevron_right</span>
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <Link
              href="/waitlist"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                marginTop: "1.25rem",
                textAlign: "center",
                backgroundColor: "#4338ca",
                color: "#fff",
                padding: "14px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 8px 20px rgba(67,56,202,0.22)",
              }}
            >
              Request Early Access
            </Link>
          </div>
        )}
      </header>

      {/* ── Page Content ── */}
      {children}

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "#f4f3f1", padding: "4rem 1.5rem", borderTop: "1px solid rgba(199,196,215,0.12)" }}>
        <div className="footer-grid" style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem" }}>
          <div style={{ maxWidth: "18rem" }}>
            <span style={{ display: "block", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.25rem", fontWeight: 900, color: "#111111", marginBottom: "0.75rem" }}>FlatMitra</span>
            <p style={{ fontSize: "0.875rem", color: "#464554", lineHeight: 1.7, marginBottom: "0.5rem" }}>The property management platform built for India's rental market.</p>
            <p style={{ fontSize: "0.75rem", color: "#777586" }}>
              Powered by{" "}
              <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{ color: "#777586", textDecoration: "underline", textUnderlineOffset: "3px" }}>eMitra Technologies</a>
            </p>
          </div>
          <div className="footer-links" style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            {FOOTER_COLS.map(col => (
              <div key={col.title}>
                <h5 style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#464554", marginBottom: "1rem" }}>{col.title}</h5>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {col.links.map(l => (
                    <li key={l.label}><Link href={l.href} className="footer-link">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: "80rem", margin: "3rem auto 0", paddingTop: "2rem", borderTop: "1px solid rgba(199,196,215,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.75rem", color: "#777586" }}>
            &copy; 2026 FlatMitra by{" "}
            <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{ color: "#777586", textDecoration: "underline", textUnderlineOffset: "3px" }}>eMitra Technologies</a>
            {" "}(Proprietorship). All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[{ label: "Privacy", href: "/legal/privacy" }, { label: "Terms", href: "/legal/terms" }, { label: "Legal", href: "/legal" }].map(l => (
              <Link key={l.label} href={l.href} style={{ fontSize: "0.75rem", color: "#777586", textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
