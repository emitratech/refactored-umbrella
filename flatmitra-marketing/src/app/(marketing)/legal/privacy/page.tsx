import Link from "next/link";

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <div id={id} style={{ marginBottom: "3rem" }}>
    <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.375rem", fontWeight: 700, color: "#1a1c1a", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(199,196,215,0.2)" }}>{title}</h2>
    {children}
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: "#464554", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>{children}</p>
);

const Bullet = ({ items }: { items: React.ReactNode[] }) => (
  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
    {items.map((item, i) => (
      <li key={i} style={{ display: "flex", gap: "0.75rem", color: "#464554", fontSize: "0.95rem", lineHeight: 1.7 }}>
        <span style={{ color: "#4338ca", marginTop: "2px", flexShrink: 0 }}>•</span>
        {item}
      </li>
    ))}
  </ul>
);

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        a { color: #2a14b4; font-weight: 600; transition: opacity 150ms ease; }
        a:hover { opacity: 0.75; }
      `}</style>


      <main style={{ maxWidth: "52rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <Link href="/legal" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2a14b4", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "2rem" }}>← Legal Hub</Link>

        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#2a14b4", display: "block", marginBottom: "0.75rem" }}>Privacy Policy</span>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1rem" }}>Your Privacy, Our Priority</h1>
        <p style={{ color: "#464554", marginBottom: "0.5rem", fontSize: "0.875rem" }}><strong>Effective Date:</strong> May 2026 &nbsp;|&nbsp; <strong>Product:</strong> FlatMitra &nbsp;|&nbsp; <strong>Operated by:</strong> <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a></p>
        <p style={{ color: "#464554", marginBottom: "3rem", fontSize: "0.875rem", lineHeight: 1.7 }}>
          FlatMitra is a B2B SaaS platform serving two types of users: (1) <strong>Property Owners / Administrators</strong> — landlords who sign up and use FlatMitra to manage their rental operations, and (2) <strong>Tenants</strong> — individuals whose data is entered into FlatMitra by the landlord they rent from. This policy applies to both.
        </p>

        <Section id="who-we-are" title="1. Who We Are">
          <P>FlatMitra is a rental property management software product developed and operated by <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a>, based in Indore, Madhya Pradesh, India. <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> is currently in the process of formal business registration under Indian law. For any privacy-related queries, contact us at <a href="mailto:support@emitra.dev">support@emitra.dev</a>.</P>
        </Section>

        <Section id="data-collected" title="2. What Data We Collect">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a" }}>2.1 From Property Owners (Our Direct Customers)</h3>
          <Bullet items={["Full name, email address, and phone number", "Property / building names, addresses, and unit details", "Login credentials (password stored in encrypted form via Supabase Auth)", "Usage logs, feature interactions, and platform activity"]} />
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a", marginTop: "1.5rem" }}>2.2 From or About Tenants (via Property Owners)</h3>
          <P>Property owners enter and manage data about their tenants on our platform. This data may include:</P>
          <Bullet items={["Full name, phone number, and date of birth", "Flat/unit assignment and tenancy start/end dates", "Rent due status and payment history", "KYC details (Aadhaar, PAN — collected by landlord, not processed by FlatMitra)", "Any additional notes or custom fields entered by the property owner"]} />
          <P>FlatMitra does not directly collect data from tenants. The property owner is responsible for informing their tenants and obtaining any required consent under applicable law.</P>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a", marginTop: "1.5rem" }}>2.3 Technical Data (Automatic)</h3>
          <Bullet items={["IP address, browser/device type, and session data", "Error logs and performance metrics for product improvement", "Cookies and local storage for session management"]} />
        </Section>

        <Section id="how-we-use" title="3. How We Use Your Data">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a" }}>3.1 To Deliver the Service</h3>
          <Bullet items={["Create and manage property owner accounts and buildings", "Store and display tenant records, rent dues, and maintenance tickets", "Send automated WhatsApp reminders and payment links", "Provide real-time collection dashboards and P&L reports"]} />
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a", marginTop: "1.5rem" }}>3.2 To Improve the Product</h3>
          <Bullet items={["Analyse usage patterns to fix bugs and improve features", "Monitor platform performance and uptime"]} />
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a", marginTop: "1.5rem" }}>3.3 To Communicate</h3>
          <Bullet items={["Send transactional emails (account confirmations, password resets)", "Respond to support requests submitted via WhatsApp or email"]} />
          <P>We do not send marketing emails without explicit opt-in. We do not sell or share your data with third-party advertisers.</P>
        </Section>

        <Section id="storage" title="4. Data Storage and Security">
          <P>Your data is stored on Supabase — a managed cloud database platform. We implement the following security practices:</P>
          <Bullet items={["Row-Level Security (RLS) to ensure each landlord's data is fully isolated", "Encrypted connections (HTTPS/TLS) for all data in transit", "Password hashing via Supabase Auth (bcrypt)", "Access controls limiting internal access to data"]} />
          <P>As a growing startup, our security controls are continuously evolving. We are committed to responsible data handling and will notify affected users promptly in the event of a data breach.</P>
        </Section>

        <Section id="retention" title="5. Data Retention">
          <P>We retain your data for as long as your account remains active. If you close your account or request deletion:</P>
          <Bullet items={["Property owner account data is deleted within 30 days of a verified request", "Tenant records associated with your account are deleted along with the account", "Anonymised or aggregated data may be retained for product analysis", "Backups may retain data for up to 90 days after deletion"]} />
        </Section>

        <Section id="sharing" title="6. Data Sharing">
          <P>We do not sell your data. We share data only with the following third-party service providers necessary to operate FlatMitra:</P>
          <Bullet items={["Supabase — database, authentication, and storage", "Vercel — hosting and content delivery", "WhatsApp Business — for automated payment reminders and support communication"]} />
          <P>We do not share data with any other party without your explicit consent, except where required by law.</P>
        </Section>

        <Section id="payments" title="7. Payments">
          <P>FlatMitra facilitates rent payment collection through PhonePe Business integration. We do not store card details or payment credentials on our platform. All payment processing is handled by PhonePe's secure infrastructure, governed by their data protection terms.</P>
        </Section>

        <Section id="rights" title="8. Your Rights Under the DPDP Act, 2023">
          <P>Under India's Digital Personal Data Protection Act, 2023, you have the following rights:</P>
          <Bullet items={["Right to access — request a copy of the personal data we hold about you", "Right to correction — request correction of inaccurate or incomplete data", "Right to erasure — request deletion of your personal data", "Right to nominate — nominate another individual to exercise your rights in case of incapacity"]} />
          <P>To exercise any of these rights, contact us at <a href="mailto:support@emitra.dev">support@emitra.dev</a>. We will respond within 30 days. Tenants should first contact their landlord, as the property owner manages their data within our platform.</P>
        </Section>

        <Section id="cookies" title="9. Cookies">
          <P>We use essential cookies for session management and login functionality only. We do not use third-party tracking cookies or advertising cookies.</P>
        </Section>

        <Section id="children" title="10. Children's Privacy">
          <P>FlatMitra is intended for use by businesses and adults (18+). We do not knowingly collect personal data of individuals under 18 years of age.</P>
        </Section>

        <Section id="changes" title="11. Changes to This Policy">
          <P>We may update this Privacy Policy as our product evolves or as legal requirements change. We will notify registered property owners via email at least 7 days before material changes take effect. The latest version will always be available at flat.emitra.dev/legal/privacy.</P>
        </Section>

        <Section id="contact" title="12. Contact">
          <Bullet items={[
            "Email: support@emitra.dev",
            "Location: Indore, Madhya Pradesh, India",
            <span key="operated">Operated by: <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> (Proprietorship)</span>,
          ]} />
        </Section>
      </main>
    </>
  );
}
