"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoLogin = (role: "ADMIN" | "RENTER") => {
    setLoading(true);
    document.cookie = `flatmitra-mock-role=${role}; path=/; max-age=86400; SameSite=Lax`;
    if (role === "ADMIN") {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/home";
    }
  };

  const handleOwnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (email === "admin@flatmitra.com") {
        handleDemoLogin("ADMIN");
        return;
      }
      setError("Invalid credentials. Use admin@flatmitra.com for demo.");
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
      setLoading(false);
    }
  };

  const handleResidentOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    handleDemoLogin("RENTER");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          font-family: 'Manrope', sans-serif;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #faf9f6;
        }

        /* ─── LEFT PANEL ─── */
        .login-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 5rem;
          overflow: hidden;
        }
        .login-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(135deg, rgba(250,249,246,0.97) 40%, rgba(250,249,246,0.85)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='800'%3E%3Crect fill='%23e8e6e1' x='40' y='0' width='80' height='800' rx='2'/%3E%3Crect fill='%23e8e6e1' x='180' y='0' width='60' height='800' rx='2'/%3E%3Crect fill='%23e8e6e1' x='300' y='0' width='70' height='800' rx='2'/%3E%3Crect fill='%23d5d3ce' x='60' y='100' width='40' height='60' rx='1'/%3E%3Crect fill='%23d5d3ce' x='60' y='200' width='40' height='60' rx='1'/%3E%3Crect fill='%23d5d3ce' x='60' y='300' width='40' height='60' rx='1'/%3E%3Crect fill='%23d5d3ce' x='60' y='400' width='40' height='60' rx='1'/%3E%3Crect fill='%23d5d3ce' x='60' y='500' width='40' height='60' rx='1'/%3E%3Crect fill='%23d5d3ce' x='190' y='80' width='35' height='50' rx='1'/%3E%3Crect fill='%23d5d3ce' x='190' y='170' width='35' height='50' rx='1'/%3E%3Crect fill='%23d5d3ce' x='190' y='260' width='35' height='50' rx='1'/%3E%3Crect fill='%23d5d3ce' x='310' y='60' width='45' height='55' rx='1'/%3E%3Crect fill='%23d5d3ce' x='310' y='160' width='45' height='55' rx='1'/%3E%3Crect fill='%23d5d3ce' x='310' y='260' width='45' height='55' rx='1'/%3E%3Crect fill='%23d5d3ce' x='310' y='360' width='45' height='55' rx='1'/%3E%3C/svg%3E");
          background-size: cover;
          z-index: 0;
        }

        .login-left-content {
          position: relative;
          z-index: 1;
          max-width: 440px;
        }

        .brand-logo {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 900;
          color: #111;
          text-decoration: none;
          letter-spacing: -0.02em;
          margin-bottom: 4rem;
          display: inline-block;
        }

        .hero-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 3.2rem;
          font-weight: 900;
          color: #111;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
        }

        .hero-sub {
          font-size: 1rem;
          color: #6b6b68;
          margin-bottom: 3rem;
          line-height: 1.5;
        }

        .field-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          color: #555;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .field-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #dedbd6;
          border-radius: 4px;
          background: #fff;
          font-size: 0.9rem;
          color: #111;
          font-family: 'Manrope', sans-serif;
          transition: border-color 150ms ease, box-shadow 150ms ease;
          outline: none;
        }
        .field-input:focus {
          border-color: #4338ca;
          box-shadow: 0 0 0 3px rgba(67,56,202,0.08);
        }
        .field-input::placeholder {
          color: #aaa;
        }

        .field-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .forgot-link {
          font-size: 0.75rem;
          color: #4338ca;
          text-decoration: none;
          font-weight: 600;
        }
        .forgot-link:hover { text-decoration: underline; }

        .btn-dashboard {
          width: 100%;
          padding: 14px;
          background: #4338ca;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 150ms ease, background 200ms ease;
          box-shadow: 0 4px 14px rgba(67,56,202,0.18);
          margin-top: 0.5rem;
        }
        .btn-dashboard:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(67,56,202,0.28);
          background: #3730a3;
        }
        .btn-dashboard:active:not(:disabled) { transform: translateY(0); }
        .btn-dashboard:disabled { opacity: 0.6; cursor: not-allowed; }

        .divider-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 1.75rem 0 1.5rem;
        }
        .divider-line { height: 1px; flex: 1; background: #dedbd6; }
        .divider-text {
          font-size: 0.65rem;
          font-weight: 700;
          color: #999;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .btn-clerk {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px;
          border: 1px solid #dedbd6;
          border-radius: 6px;
          background: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          color: #333;
          font-family: 'Manrope', sans-serif;
          cursor: pointer;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .btn-clerk:hover {
          border-color: #4338ca;
          box-shadow: 0 4px 12px rgba(67,56,202,0.06);
        }
        .clerk-icon {
          width: 22px;
          height: 22px;
          background: #4338ca;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .clerk-icon svg { width: 13px; height: 13px; fill: #fff; }

        .footer-text {
          position: absolute;
          bottom: 2rem;
          left: 5rem;
          font-size: 0.72rem;
          color: #aaa;
          z-index: 1;
        }

        /* ─── RIGHT PANEL ─── */
        .login-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          overflow: hidden;
        }
        .login-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(180deg, rgba(210,208,204,0.6) 0%, rgba(195,192,188,0.8) 100%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='900'%3E%3Crect fill='%23bbb8b2' x='80' y='0' width='120' height='900' rx='3'/%3E%3Crect fill='%23bbb8b2' x='260' y='0' width='100' height='900' rx='3'/%3E%3Crect fill='%23bbb8b2' x='420' y='0' width='110' height='900' rx='3'/%3E%3Crect fill='%23a8a5a0' x='100' y='80' width='60' height='70' rx='2'/%3E%3Crect fill='%23a8a5a0' x='100' y='190' width='60' height='70' rx='2'/%3E%3Crect fill='%23a8a5a0' x='100' y='300' width='60' height='70' rx='2'/%3E%3Crect fill='%23a8a5a0' x='280' y='60' width='50' height='60' rx='2'/%3E%3Crect fill='%23a8a5a0' x='280' y='160' width='50' height='60' rx='2'/%3E%3Crect fill='%23a8a5a0' x='280' y='260' width='50' height='60' rx='2'/%3E%3Crect fill='%23a8a5a0' x='440' y='90' width='55' height='65' rx='2'/%3E%3Crect fill='%23a8a5a0' x='440' y='200' width='55' height='65' rx='2'/%3E%3Crect fill='%23a8a5a0' x='440' y='310' width='55' height='65' rx='2'/%3E%3C/svg%3E");
          background-size: cover;
          z-index: 0;
        }

        /* Decorative corner bracket */
        .login-right::after {
          content: '';
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          border-right: 2px solid rgba(67,56,202,0.35);
          border-bottom: 2px solid rgba(67,56,202,0.35);
          z-index: 1;
        }

        .resident-card {
          position: relative;
          z-index: 2;
          background: #fff;
          border-radius: 16px;
          padding: 2.5rem 2.25rem 2rem;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
          text-align: center;
        }

        .resident-icon {
          width: 52px;
          height: 52px;
          background: #4338ca;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .resident-icon svg {
          width: 26px;
          height: 26px;
          fill: #fff;
        }

        .resident-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .resident-sub {
          font-size: 0.82rem;
          color: #777;
          line-height: 1.5;
          margin-bottom: 1.75rem;
        }

        .phone-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          color: #555;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
          text-align: left;
        }

        .phone-field {
          display: flex;
          align-items: center;
          border: 1px solid #dedbd6;
          border-radius: 6px;
          background: #f5f4f0;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .phone-prefix {
          padding: 14px 12px 14px 16px;
          font-size: 0.88rem;
          color: #888;
          font-weight: 600;
          border-right: 1px solid #dedbd6;
          background: #eeedea;
          white-space: nowrap;
          font-family: 'Manrope', sans-serif;
        }
        .phone-input {
          flex: 1;
          padding: 14px 16px;
          border: none;
          background: transparent;
          font-size: 0.92rem;
          color: #111;
          font-family: 'Manrope', sans-serif;
          outline: none;
          letter-spacing: 0.04em;
        }
        .phone-input::placeholder { color: #bbb; }

        .btn-otp {
          width: 100%;
          padding: 14px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          transition: background 200ms ease, transform 180ms ease;
        }
        .btn-otp:hover:not(:disabled) {
          background: #333;
          transform: translateY(-1px);
        }
        .btn-otp:disabled { opacity: 0.6; cursor: not-allowed; }

        .qr-divider {
          font-size: 0.62rem;
          font-weight: 700;
          color: #999;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 1.5rem 0 0.75rem;
        }

        .qr-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: 1px solid #dedbd6;
          border-radius: 8px;
          background: #faf9f6;
          font-size: 0.8rem;
          font-weight: 600;
          color: #555;
          font-family: 'Manrope', sans-serif;
          cursor: pointer;
          transition: border-color 200ms ease, background 200ms ease;
        }
        .qr-btn:hover {
          border-color: #4338ca;
          background: #f0eff8;
          color: #4338ca;
        }
        .qr-icon svg {
          width: 20px;
          height: 20px;
          fill: #888;
        }
        .qr-btn:hover .qr-icon svg { fill: #4338ca; }

        .error-toast {
          background: #ffdad6;
          color: #ba1a1a;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid rgba(186,26,26,0.1);
          margin-bottom: 1rem;
          text-align: left;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .login-root {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }
          .login-left {
            padding: 2.5rem 2rem;
            min-height: auto;
          }
          .login-left::before { display: none; }
          .hero-heading { font-size: 2.2rem; }
          .hero-sub { margin-bottom: 2rem; }
          .footer-text { display: none; }
          .login-right {
            padding: 2rem;
          }
          .login-right::before { opacity: 0.4; }
          .login-right::after { display: none; }
        }
      `}</style>

      <div className="login-root">
        {/* ═══ LEFT: Owner Login ═══ */}
        <div className="login-left">
          <div className="login-left-content">
            <Link href="/" className="brand-logo">FlatMitra</Link>

            <h1 className="hero-heading">
              Manage Your<br />Portfolio
            </h1>
            <p className="hero-sub">
              The editorial property engine for modern landlords.
            </p>

            {error && <div className="error-toast">{error}</div>}

            <form onSubmit={handleOwnerSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label className="field-label" htmlFor="owner-email">Email Address</label>
                <input
                  id="owner-email"
                  type="email"
                  required
                  className="field-input"
                  placeholder="owner@estatedashboard.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <div className="field-row">
                  <label className="field-label" htmlFor="owner-password" style={{ marginBottom: 0 }}>Password</label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
                <input
                  id="owner-password"
                  type="password"
                  required
                  className="field-input"
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-dashboard">
                {loading ? "Authenticating..." : "Enter Dashboard"}
              </button>
            </form>

            {/* Divider */}
            <div className="divider-row">
              <div className="divider-line" />
              <span className="divider-text">Or Continue With</span>
              <div className="divider-line" />
            </div>

            {/* SSO / Clerk */}
            <button type="button" className="btn-clerk" onClick={() => handleDemoLogin("ADMIN")}>
              <span className="clerk-icon">
                <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </span>
              Login with Clerk
            </button>

            {/* Dev Quick Access */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0eff8', borderRadius: '8px', border: '1px dashed #4338ca40' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4338ca', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }}>⚡ Dev Quick Access</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => handleDemoLogin('ADMIN')} style={{ flex: 1, padding: '10px', background: '#4338ca', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Enter as Owner
                </button>
                <button type="button" onClick={() => handleDemoLogin('RENTER')} style={{ flex: 1, padding: '10px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Enter as Tenant
                </button>
              </div>
            </div>
          </div>

          <span className="footer-text">© 2025 FlatMitra Editorial. All rights reserved.</span>
        </div>

        {/* ═══ RIGHT: Resident Access ═══ */}
        <div className="login-right">
          <div className="resident-card">
            <div className="resident-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>

            <h2 className="resident-heading">Resident Access</h2>
            <p className="resident-sub">
              Instant access to your home portal via secure<br />mobile verification.
            </p>

            <form onSubmit={handleResidentOtp}>
              <label className="phone-label">Mobile Number</label>
              <div className="phone-field">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  className="phone-input"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  maxLength={12}
                  disabled={loading}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-otp">
                {loading ? "Sending..." : "Get Secure Code"}
              </button>
            </form>

            <div className="qr-divider">Entry Via QR Code</div>

            <button
              type="button"
              className="qr-btn"
              onClick={() => handleDemoLogin("RENTER")}
            >
              <span className="qr-icon">
                <svg viewBox="0 0 24 24"><path d="M3 11h2v2H3v-2zm0-4h2v2H3V7zm4 4h2v2H7v-2zm0-4h2v2H7V7zm0-4h2v2H7V3zM3 3h2v2H3V3zm8 8h2v2h-2v-2zm-4 4h2v2H7v-2zM3 15h2v2H3v-2zm8-8h2v2h-2V7zm4 0h2v2h-2V7zm0 8h2v2h-2v-2zm4-4h2v2h-2v-2zm0-4h2v2h-2V7zm0 8h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2h-2v-2zm0-4h2v2h-2v-2zm4 0h2v2h-2v-2zm4-8h2v2h-2V3zM7 3h2v2H7V3zm4 0h2v2h-2V3z"/></svg>
              </span>
              Scanning your door QR code?
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
