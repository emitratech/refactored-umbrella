"use client";

import React from "react";
import { LifeBuoy, MessageCircle, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/buttons/button";

const supportItems = [
  {
    icon: MessageCircle,
    title: "Chat with Us",
    desc: "Get real-time help from our support team",
    action: "Start Chat",
    href: "mailto:hello@emitra.dev",
  },
  {
    icon: FileText,
    title: "Documentation",
    desc: "Browse guides, FAQs, and tutorials",
    action: "View Docs",
    href: "/features",
  },
  {
    icon: LifeBuoy,
    title: "Report a Bug",
    desc: "Found something broken? Let us know",
    action: "Report",
    href: "mailto:bugs@emitra.dev?subject=Bug%20Report%20-%20FlatMitra",
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Support</h1>
      <p className="text-sm text-gray-500 mb-8">Need help? We&apos;re here for you.</p>

      <div className="grid gap-4">
        {supportItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-150 p-5 flex items-center gap-4 hover:border-[#5B48BD] hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f0eff8] dark:bg-[#2a2640] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5B48BD] transition-colors">
              <item.icon size={20} className="text-[#5B48BD] group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
            <span className="text-xs font-semibold text-[#5B48BD] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.action} <ExternalLink size={12} />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-br from-[#4338ca] to-[#6d28d9] rounded-2xl p-6 text-center text-white">
        <h3 className="text-lg font-bold mb-1">Need urgent help?</h3>
        <p className="text-sm text-white/70 mb-4">Our team is available Mon–Sat, 10 AM – 7 PM IST.</p>
        <a
          href="mailto:hello@emitra.dev"
          className="inline-block bg-white text-[#4338ca] font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-white/90 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
