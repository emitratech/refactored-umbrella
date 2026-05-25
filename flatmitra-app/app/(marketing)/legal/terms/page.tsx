import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import styles from "./page.module.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <div id={id} style={{ marginBottom: "3rem" }}>
    <h2 style={{ fontFamily: plusJakartaSans.style.fontFamily, fontSize: "1.375rem", fontWeight: 700, color: "#1a1c1a", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(199,196,215,0.2)" }}>{title}</h2>
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

export default function TermsPage() {
  return (
    <>
      <main className={styles.container} style={{ maxWidth: "52rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <Link href="/legal" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2a14b4", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "2rem" }}>← Legal Hub</Link>

        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#2a14b4", display: "block", marginBottom: "0.75rem" }}>Terms of Service</span>
        <h1 style={{ fontFamily: plusJakartaSans.style.fontFamily, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1rem" }}>Terms &amp; Conditions</h1>
        <p style={{ color: "#464554", marginBottom: "0.5rem", fontSize: "0.875rem" }}><strong>Effective Date:</strong> March 2026 &nbsp;|&nbsp; <strong>Product:</strong> FlatMitra &nbsp;|&nbsp; <strong>Operated by:</strong> <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a></p>
        <p style={{ color: "#464554", marginBottom: "3rem", fontSize: "0.875rem", lineHeight: 1.7 }}>
          These Terms govern the use of FlatMitra by property owners and their administrators. By creating an account or using the platform, you agree to these Terms. Please read them carefully.
        </p>

        <Section id="definitions" title="1. Definitions">
          <Bullet items={[
            '"Platform" refers to FlatMitra, accessible at flat.emitra.dev and associated services.',
            <span key="company">"Company", "We", "Us" refers to <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a>, the operator of FlatMitra.</span>,
            '"Customer" or "You" refers to the property owner, administrator, or business entity that registers and uses FlatMitra.',
            '"Tenants" refers to the individuals whose data is managed within the Customer\'s FlatMitra workspace.',
            '"Workspace" refers to the isolated, owner-specific environment created for each account on the platform.',
          ]} />
        </Section>

        <Section id="eligibility" title="2. Eligibility and Account Registration">
          <P>To use FlatMitra, you must:</P>
          <Bullet items={["Be at least 18 years of age", "Be legally authorised to enter into agreements as a property owner or manager", "Provide accurate and complete information during registration"]} />
          <P>You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:support@emitra.dev">support@emitra.dev</a> if you suspect unauthorized access.</P>
        </Section>

        <Section id="permitted-use" title="3. Permitted Use">
          <P>FlatMitra is a property management platform designed to help landlords and property managers handle rent collection, tenant onboarding, KYC, and building operations. You may use the platform only for lawful business purposes consistent with these Terms.</P>
          <P><strong>You agree NOT to:</strong></P>
          <Bullet items={["Use FlatMitra for any purpose other than managing a legitimate rental property or real estate business", "Enter false, misleading, or fraudulent information about tenants or transactions", "Attempt to access another landlord's data or workspace", "Reverse-engineer, copy, or redistribute any part of the platform", "Use the platform in violation of any applicable law, including India's DPDP Act, 2023"]} />
        </Section>

        <Section id="data-controller" title="4. Your Responsibilities as a Data Controller">
          <P><strong>Important:</strong> As a property owner using FlatMitra, you are the Data Fiduciary / Controller of your tenants' personal data under the DPDP Act, 2023. <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> acts as a Data Processor on your behalf.</P>
          <P>You are responsible for:</P>
          <Bullet items={["Informing your tenants that their data is being managed using FlatMitra", "Obtaining any consent required from your tenants for data collection", "Ensuring the data you enter is accurate and used only for legitimate rental management purposes", "Handling tenant data deletion or correction requests", "Complying with applicable data protection laws in your jurisdiction"]} />
        </Section>

        <Section id="free-trial" title="5. Free Trial">
          <P>FlatMitra offers an early access trial period for new property owners. No credit card or payment is required during the trial. We will communicate trial duration and transition details during onboarding. At the end of the trial period, you may choose to continue with a paid plan or your account will be paused (data retained for 60 days).</P>
        </Section>

        <Section id="payments" title="6. Payments">
          <P>FlatMitra facilitates rent collection from tenants on behalf of property owners via PhonePe Business integration. Details of our fee structure and settlement terms will be communicated to property owners during onboarding and ahead of any changes.</P>
          <P>We will notify existing users at least 30 days before any change to fees or settlement terms.</P>
        </Section>

        <Section id="availability" title="7. Service Availability">
          <P>We strive to maintain platform availability at all times. However, we do not guarantee 100% uptime. Scheduled maintenance, third-party service outages (e.g., Supabase, Vercel), or unforeseen technical issues may temporarily affect access. We will make reasonable efforts to notify you in advance of planned downtime.</P>
        </Section>

        <Section id="support" title="8. Support">
          <P>Customer support is available via:</P>
          <Bullet items={["WhatsApp: available during business hours", "Email: support@emitra.dev", "Response commitment: within 5 hours, 7 days a week (may vary during public holidays)"]} />
        </Section>

        <Section id="ip" title="9. Intellectual Property">
          <P>FlatMitra and all related content, design, code, and branding are the intellectual property of <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a>. You are granted a limited, non-exclusive, non-transferable licence to use the platform for your property management purposes.</P>
          <P>You retain ownership of all data you enter into the platform (tenant records, property data, etc.). We do not claim any ownership over your data.</P>
        </Section>

        <Section id="termination" title="10. Termination">
          <h3 style={{ fontFamily: plusJakartaSans.style.fontFamily, fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a" }}>10.1 By You</h3>
          <P>You may cancel your account at any time by contacting us at <a href="mailto:support@emitra.dev">support@emitra.dev</a>. Upon cancellation, your data will be retained for 60 days before permanent deletion.</P>
          <h3 style={{ fontFamily: plusJakartaSans.style.fontFamily, fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem", color: "#1a1c1a", marginTop: "1.5rem" }}>10.2 By Us</h3>
          <P>We reserve the right to suspend or terminate your account if you violate these Terms, use the account for fraudulent or illegal activity, or fail to pay applicable fees after a 14-day grace period.</P>
        </Section>

        <Section id="liability" title="11. Limitation of Liability">
          <P>To the maximum extent permitted by applicable law, <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a> shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of FlatMitra. Our total liability for any claim shall not exceed the amount you paid to us in the 3 months preceding the claim.</P>
        </Section>

        <Section id="governing-law" title="12. Governing Law and Disputes">
          <P>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India. We encourage resolution through direct communication first — contact us at <a href="mailto:support@emitra.dev">support@emitra.dev</a> before initiating any proceedings.</P>
        </Section>

        <Section id="changes" title="13. Changes to These Terms">
          <P>We may update these Terms from time to time. Material changes will be communicated via email at least 14 days before they take effect. Continued use of the platform constitutes acceptance of the updated Terms. The latest version will be available at flat.emitra.dev/legal/terms.</P>
        </Section>

        <Section id="contact" title="14. Contact">
          <Bullet items={[
            "Email: support@emitra.dev",
            <span key="operated">Operated by: <a href="https://emitra.dev" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>eMitra Technologies</a>, Indore, Madhya Pradesh, India</span>,
          ]} />
        </Section>
      </main>
    </>
  );
}
