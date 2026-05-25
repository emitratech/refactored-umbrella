"use client";

import React from "react";
import { Button } from "@/components/buttons/button";
import { User, Bell, Shield, Palette, Building2, LogOut } from "lucide-react";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", desc: "Update your name, email, and avatar" },
      { icon: Shield, label: "Security", desc: "Password, two-factor authentication" },
      { icon: Bell, label: "Notifications", desc: "Email and push notification preferences" },
    ],
  },
  {
    title: "Organization",
    items: [
      { icon: Building2, label: "Tenant Settings", desc: "Organization name, plan, and billing" },
      { icon: Palette, label: "Appearance", desc: "Theme, display preferences" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your account and organization preferences.</p>

      {settingsGroups.map((group) => (
        <div key={group.title} className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{group.title}</h2>
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
            {group.items.map((item, i) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  i > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#f0eff8] dark:bg-[#2a2640] flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[#5B48BD]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6">
        <Button
          variant="danger"
          onClick={() => {
            document.cookie = "flatmitra-mock-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/login";
          }}
          className="flex items-center gap-2"
        >
          <LogOut size={16} /> Sign Out
        </Button>
      </div>
    </div>
  );
}
