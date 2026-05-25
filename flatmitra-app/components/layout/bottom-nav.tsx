"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, AlertCircle, File, Menu, Plus } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: Home, href: "/home" },
    { label: "Bills", icon: FileText, href: "/bills" },
    { label: "Issues", icon: AlertCircle, href: "/tenant-issues" },
    { label: "Docs", icon: File, href: "/documents" },
    { label: "More", icon: Menu, href: "/more" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white dark:bg-[#171717] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-2 pb-safe z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
      {navItems.map((item, index) => {
        // Simple active matching logic for UI purposes
        const isActive = pathname === item.href || (pathname === "/" && item.href === "/home");
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`
              flex flex-col items-center justify-center w-full h-full space-y-1 relative
              ${isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}
              transition-colors duration-200
            `}
          >
            <div className={`relative flex items-center justify-center w-10 h-8 rounded-full ${isActive ? "bg-primary/10 dark:bg-primary/20" : "bg-transparent"}`}>
              <item.icon 
                size={22} 
                className={isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* Floating Action Button (FAB) */}
      <button 
        className="absolute -top-6 right-4 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(91,72,189,0.4)] hover:bg-[#4a3a9b] transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#171717] z-50"
        aria-label="Quick Action"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>
    </div>
  );
}
