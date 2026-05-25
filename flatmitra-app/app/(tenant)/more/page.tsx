"use client";

import React from "react";
import { User, Settings, HelpCircle, FileText, Bell, Lock, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/cards/card";

export default function TenantMorePage() {
  const menuGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "My Profile", href: "/profile", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { icon: Settings, label: "App Settings", href: "/settings", color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800" },
        { icon: Bell, label: "Notifications", href: "/notifications", color: "text-warning", bg: "bg-warning/10" },
      ]
    },
    {
      title: "Support & Legal",
      items: [
        { icon: HelpCircle, label: "Help & Support", href: "/support", color: "text-success", bg: "bg-success/10" },
        { icon: FileText, label: "Terms of Service", href: "/terms", color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800" },
        { icon: Lock, label: "Privacy Policy", href: "/privacy", color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800" },
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Summary Header */}
      <div className="flex items-center space-x-4 mb-6 mt-2">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl border-2 border-primary/20">
          AM
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Arjun Mehta</h1>
          <p className="text-sm text-gray-500">arjun.mehta@example.com</p>
          <div className="mt-1 flex items-center">
            <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-bold uppercase rounded tracking-wider">Verified Tenant</span>
          </div>
        </div>
      </div>

      {/* Menu Groups */}
      <div className="space-y-6">
        {menuGroups.map((group, i) => (
          <div key={i}>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 ml-1">{group.title}</h2>
            <Card className="p-0 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {group.items.map((item, j) => (
                  <Link key={j} href={item.href} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg}`}>
                        <item.icon size={16} className={item.color} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="pt-4">
        <button className="flex items-center justify-center w-full py-4 text-danger font-bold bg-danger/5 hover:bg-danger/10 rounded-xl transition-colors">
          <LogOut size={18} className="mr-2" />
          Log Out
        </button>
      </div>

      <div className="text-center pt-4 pb-8">
        <p className="text-xs text-gray-400">FlatMitra v1.0.0</p>
      </div>
    </div>
  );
}
