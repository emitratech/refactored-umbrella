export const dpaSections = [
  {
    title: "Roles",
    content: {
      type: "bullets",
      items: [
        "Data Fiduciary (Controller): The Property Owner / Customer who collects and determines the purpose of processing tenant personal data.",
        { isProcessorLink: true, text: "Data Processor: eMitra Technologies, which processes personal data on behalf of the property owner via the FlatMitra platform." }
      ]
    }
  },
  {
    title: "What Data is Processed",
    content: {
      type: "p",
      text: "We process only the data that the property owner enters into FlatMitra, which may include tenant names, phone numbers, tenancy details, payment status, and maintenance records. We do not process this data for any purpose other than providing the FlatMitra service."
    }
  },
  {
    title: "Sub-processors",
    content: {
      type: "mixed",
      items: [
        { type: "p", text: "We use the following sub-processors to deliver our service:" },
        { type: "bullets", items: ["Supabase Inc. — database, auth, and storage", "Vercel Inc. — application hosting", "PhonePe Business — payment settlement infrastructure"] },
        { type: "p", text: "All sub-processors are contractually bound to appropriate data protection standards." }
      ]
    }
  },
  {
    title: "Security Measures",
    content: {
      type: "bullets",
      items: ["Encrypted data transmission (HTTPS/TLS)", "Row-Level Security to isolate each property owner's data from others", "Access restricted to authorised personnel only", "Regular security reviews as the platform scales"]
    }
  },
  {
    title: "Data Subject Rights",
    content: {
      type: "p",
      text: "When a tenant submits a data request (access, correction, deletion) to their landlord, the property owner can fulfil these requests directly within FlatMitra. For requests that require platform-level action, we will cooperate within 30 days."
    }
  },
  {
    title: "Breach Notification",
    content: {
      type: "p",
      text: "In the event of a personal data breach, we will notify affected property owners within 72 hours. Property owners are responsible for notifying their affected tenants as required by applicable law."
    }
  },
  {
    title: "Termination of Processing",
    content: {
      type: "p",
      text: "Upon account termination, all personal data entered by the property owner will be deleted from active storage within 30 days and from backups within 90 days."
    }
  }
];
