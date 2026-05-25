import { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { dpaSections } from "./dpa-content";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA) | FlatMitra",
  description: "How FlatMitra acts as a data processor for property management under India's Digital Personal Data Protection Act, 2023.",
  openGraph: {
    title: "Data Processing Agreement (DPA) | FlatMitra",
    description: "How FlatMitra acts as a data processor for property management under India's Digital Personal Data Protection Act, 2023.",
    url: "https://flat.emitra.dev/legal/dpa",
  },
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: "#464554", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>{children}</p>
);
const stableContentKey = (item: any) => typeof item === 'string' ? item : JSON.stringify(item).slice(0, 50);

const Bullet = ({ items }: { items: React.ReactNode[] }) => (
  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
    {items.map((item, idx) => (
      <li key={idx} style={{ display: "flex", gap: "0.75rem", color: "#464554", fontSize: "0.95rem", lineHeight: 1.7 }}>
        <span style={{ color: "#4338ca", marginTop: "2px", flexShrink: 0 }}>•</span>
        {item}
      </li>
    ))}
  </ul>
);

export default function DPAPage() {
  return (
    <div className={`${plusJakartaSans.variable} ${manrope.variable}`} style={{ fontFamily: "var(--font-manrope), sans-serif", backgroundColor: "#faf9f6", color: "#1a1c1a", minHeight: "100vh" }}>
      <style>{`
        a { color: #2a14b4; font-weight: 600; transition: opacity 150ms ease; }
        a:hover { opacity: 0.75; }
        @media (max-width: 768px) { .nav-home { display: none; } }
      `}</style>

      <header style={{ backgroundColor: "#faf9f6", borderBottom: "1px solid rgba(199,196,215,0.2)", position: "sticky", top: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1.5rem", height: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 900, color: "#111111", textDecoration: "none", letterSpacing: "-0.02em", fontFamily: "var(--font-plus-jakarta), sans-serif" }}>FlatMitra</Link>
          <nav className="nav-links" style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/" className="nav-home" style={{ color: "rgba(17,17,17,0.6)", fontWeight: 700, fontFamily: "var(--font-plus-jakarta), sans-serif", textDecoration: "none", fontSize: "0.9rem" }}>Home</Link>
            <Link href="/legal" style={{ color: "#4338ca", fontWeight: 700, borderBottom: "2px solid #4338ca", paddingBottom: "2px", fontFamily: "var(--font-plus-jakarta), sans-serif", textDecoration: "none", fontSize: "0.9rem" }}>Legal</Link>
          </nav>
        </div>
        <Link href="/waitlist" style={{ backgroundColor: "#4338ca", color: "#ffffff", padding: "8px 20px", borderRadius: "4px", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>Request Access</Link>
      </header>

      <main style={{ maxWidth: "52rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <Link href="/legal" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2a14b4", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "2rem" }}>← Legal Hub</Link>

        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#2a14b4", display: "block", marginBottom: "0.75rem" }}>Data Processing Agreement</span>
        <h1 style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1rem" }}>Data Processing Summary</h1>
        <p style={{ color: "#464554", marginBottom: "3rem", fontSize: "0.875rem", lineHeight: 1.7 }}>
          This summary outlines the data processing relationship between <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> (acting as Data Processor) and Property Owners using FlatMitra (acting as Data Fiduciaries / Controllers), in accordance with India's Digital Personal Data Protection Act, 2023.
          <br /><br />
          A full Data Processing Agreement can be provided on request for enterprise customers or property management companies requiring formal contractual documentation.
        </p>

        {dpaSections.map(section => {
          const renderItem = (item: any) => {
            if (typeof item === 'string') return item;
            if (item.isProcessorLink) {
              return (
                <span key="processor">Data Processor: <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a>, which processes personal data on behalf of the property owner via the FlatMitra platform.</span>
              );
            }
            return null;
          };

          const renderContent = (content: any) => {
            if (content.type === "bullets") {
              return <Bullet items={content.items.map(renderItem)} />;
            }
            if (content.type === "p") {
              return <P>{content.text}</P>;
            }
            if (content.type === "mixed") {
              return (
                <>
                  {content.items.map((el: any) => {
                    if (el.type === "p") return <P key={el.text.slice(0,20)}>{el.text}</P>;
                    if (el.type === "bullets") return <Bullet key="bullets" items={el.items.map(renderItem)} />;
                    return null;
                  })}
                </>
              );
            }
            return null;
          };

          return (
            <div key={section.title} style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#1a1c1a", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(199,196,215,0.2)" }}>{section.title}</h2>
              {renderContent(section.content)}
            </div>
          );
        })}

        <div style={{ marginTop: "3rem", backgroundColor: "#f4f3f1", borderRadius: "12px", padding: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 700, marginBottom: "0.75rem" }}>Request Full DPA</h3>
          <P>Property management companies or enterprise clients requiring a formal DPA document for compliance purposes can request one at <a href="mailto:support@emitra.dev">support@emitra.dev</a>.</P>
          <p style={{ fontSize: "0.8rem", color: "#777586" }}>FlatMitra by <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> &nbsp;|&nbsp; support@emitra.dev &nbsp;|&nbsp; flat.emitra.dev</p>
        </div>
      </main>

      <footer style={{ backgroundColor: "#f4f3f1", borderTop: "1px solid rgba(199,196,215,0.15)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "#777586" }}>© 2026–{new Date().getFullYear()} FlatMitra — <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> (Proprietorship). All rights reserved.</p>
      </footer>
    </div>
  );
}
