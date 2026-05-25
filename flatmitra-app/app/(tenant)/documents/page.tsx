"use client";

import React from "react";
import { FileText, Download, ShieldCheck, Receipt } from "lucide-react";
import { Card } from "@/components/cards/card";

export default function TenantDocumentsPage() {
  const documentGroups = [
    {
      title: "Lease Agreements",
      items: [
        { name: "Current Lease Agreement", date: "Jan 1, 2023", size: "2.4 MB", icon: FileText, active: true },
        { name: "Previous Lease Agreement", date: "Jan 1, 2022", size: "2.1 MB", icon: FileText, active: false },
      ]
    },
    {
      title: "Verification & Compliance",
      items: [
        { name: "Police Verification Certificate", date: "Sep 15, 2023", size: "1.2 MB", icon: ShieldCheck, active: true },
        { name: "Society NOC", date: "Dec 20, 2022", size: "0.8 MB", icon: ShieldCheck, active: false },
      ]
    },
    {
      title: "Recent Receipts",
      items: [
        { name: "Rent Receipt - Oct 2023", date: "Oct 5, 2023", size: "0.5 MB", icon: Receipt, active: false },
        { name: "Rent Receipt - Sep 2023", date: "Sep 5, 2023", size: "0.5 MB", icon: Receipt, active: false },
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
        <p className="text-sm text-gray-500 mt-1">Access your lease, receipts, and NOCs.</p>
      </div>

      <div className="space-y-6">
        {documentGroups.map((group, i) => (
          <div key={i}>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">{group.title}</h2>
            <Card className="p-0 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {group.items.map((item, j) => (
                  <div key={j} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.active ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.date} • {item.size}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-primary transition-colors p-2">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
