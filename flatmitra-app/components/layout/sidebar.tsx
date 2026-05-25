"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Receipt, 
  AlertCircle, 
  Wallet, 
  BarChart3, 
  Settings, 
  LifeBuoy, 
  LogOut, 
  Menu,
  X,
  HelpCircle
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Buildings", href: "/buildings", icon: Building2 },
  { title: "Tenants", href: "/tenants", icon: Users },
  { title: "Billing", href: "/billing", icon: Receipt },
  { title: "Issues", href: "/issues", icon: AlertCircle, badge: "3" },
  { title: "Expenses", href: "/expenses", icon: Wallet },
  { title: "Reports", href: "/reports", icon: BarChart3 },
];

const bottomNavItems: NavItem[] = [
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Support", href: "/support", icon: LifeBuoy },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Hamburger Menu Toggle */}
      <button 
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-[#171717] rounded-md shadow-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Toggle Navigation"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
          onClick={toggleMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen z-40 
          bg-white dark:bg-[#171717] border-r border-gray-200 dark:border-gray-800
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isMobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full md:translate-x-0"}
          md:w-[60px] lg:w-[240px]
          group
        `}
      >
        {/* Logo Section */}
        <div className="h-[64px] flex items-center px-4 border-b border-gray-200 dark:border-gray-800 overflow-hidden shrink-0">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold shrink-0">
            E
          </div>
          <span className="ml-3 font-semibold text-lg text-gray-900 dark:text-white whitespace-nowrap opacity-100 md:opacity-0 lg:opacity-100 transition-opacity duration-300">
            FlatMitra
          </span>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-none">
          <nav className="space-y-1 px-2">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');
              
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`
                    flex items-center px-2.5 py-2.5 rounded-md transition-colors relative group/item
                    ${isActive 
                      ? "bg-gray-50 dark:bg-gray-800/50 text-primary font-bold" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/80 font-medium"}
                  `}
                  title={item.title} // Native tooltip as fallback
                >
                  {/* Left Border Accent for Active State */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[calc(100%-12px)] bg-primary rounded-r-full" />
                  )}
                  
                  <item.icon size={20} className={`shrink-0 ${isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}`} />
                  
                  <span className="ml-3 whitespace-nowrap flex-1 flex items-center justify-between opacity-100 md:opacity-0 lg:opacity-100 transition-opacity duration-300">
                    {item.title}
                    {item.badge && (
                      <span className="ml-2 bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </span>

                  {/* Tablet Custom Tooltip */}
                  <div className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible md:group-hover/item:opacity-100 md:group-hover/item:visible lg:hidden transition-all whitespace-nowrap z-50 pointer-events-none">
                    {item.title}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-4 px-2 shrink-0">
          <nav className="space-y-1 mb-4">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`
                    flex items-center px-2.5 py-2.5 rounded-md transition-colors relative group/item
                    ${isActive 
                      ? "bg-gray-50 dark:bg-gray-800/50 text-primary font-bold" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/80 font-medium"}
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[calc(100%-12px)] bg-primary rounded-r-full" />
                  )}
                  <item.icon size={20} className={`shrink-0 ${isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}`} />
                  <span className="ml-3 whitespace-nowrap opacity-100 md:opacity-0 lg:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </span>

                  {/* Tablet Custom Tooltip */}
                  <div className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible md:group-hover/item:opacity-100 md:group-hover/item:visible lg:hidden transition-all whitespace-nowrap z-50 pointer-events-none">
                    {item.title}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="flex items-center justify-between px-2.5 py-2 mt-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors cursor-pointer group/user overflow-hidden">
            <div className="flex items-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 border border-gray-300 dark:border-gray-600">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=FlatMitra" alt="User Profile" className="w-full h-full object-cover" />
              </div>
              <div className="ml-3 opacity-100 md:opacity-0 lg:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">admin@flatmitra.com</p>
              </div>
            </div>
            <button 
              className="text-gray-500 hover:text-danger dark:hover:text-danger opacity-100 md:opacity-0 lg:opacity-100 transition-colors duration-300 ml-2"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
