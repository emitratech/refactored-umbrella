import Link from "next/link";
import styles from "./page.module.css";

const EFFECTIVE_DATE = "March 2026";

export default function LegalHubPage() {
  return (
    <>
      <main className={styles.main}>
        <span className={styles.label}>Legal Documents</span>
        <h1 className={styles.title}>FlatMitra Legal Hub</h1>
        <p className={styles.operatedBy}>Operated by <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a></p>
        <p className={styles.effectiveDate}>Effective: {EFFECTIVE_DATE}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {[
            { title: "Privacy Policy", href: "/legal/privacy", desc: "How we collect, use, store, and protect your data. Your rights under the DPDP Act 2023." },
            { title: "Terms of Service", href: "/legal/terms", desc: "Rules of use, your responsibilities as a property owner, and our service commitments." },
            { title: "Data Processing Summary", href: "/legal/dpa", desc: "How FlatMitra acts as a data processor for landlord tenant records under Indian law." },
          ].map(doc => (
            <Link key={doc.title} href={doc.href} aria-label={`${doc.title} - ${doc.desc}`} className={styles.legalCard} style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "2rem", border: "1px solid rgba(199,196,215,0.2)", textDecoration: "none", display: "block" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1a1c1a", marginBottom: "0.75rem" }}>{doc.title}</h3>
              <p style={{ color: "#464554", fontSize: "0.9rem", lineHeight: 1.6 }}>{doc.desc}</p>
              <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#2a14b4", letterSpacing: "0.05em" }}>Read document →</p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "4rem", backgroundColor: "#f4f3f1", borderRadius: "12px", padding: "2rem" }}>
          <h3 style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Contact</h3>
          <p style={{ color: "#464554", fontSize: "0.875rem", lineHeight: 1.7 }}>
            For any legal queries, write to us at <a href="mailto:support@emitra.dev" style={{ color: "#2a14b4", fontWeight: 700 }}>support@emitra.dev</a><br />
            Operated by: <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a>, Indore, Madhya Pradesh, India
          </p>
        </div>
      </main>
    </>
  );
}
