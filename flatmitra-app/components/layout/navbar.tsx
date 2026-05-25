"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Bell, User, Settings, LogOut, Menu, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close dropdowns when clicking outside (simplified for UI)
  useEffect(() => {
    const closeDropdowns = () => {
      setIsNotificationsOpen(false);
      setIsProfileOpen(false);
    };
    window.addEventListener("click", closeDropdowns);
    return () => window.removeEventListener("click", closeDropdowns);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => setSearchQuery("");

  const notifications = [
    { id: 1, icon: FileText, message: "New lease signed for Flat 402", time: "10 mins ago", unread: true },
    { id: 2, icon: AlertCircle, message: "Urgent issue reported at Sunrise Towers", time: "1 hour ago", unread: true },
    { id: 3, icon: Bell, message: "Payment received from John Doe", time: "2 hours ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 h-[64px] bg-white dark:bg-[#171717] border-b border-gray-200 dark:border-gray-800 w-full flex items-center justify-between px-4 lg:px-6 transition-colors">
      
      {/* Left side: Search & Mobile Menu Toggle */}
      <div className="flex items-center flex-1">
        {/* Visual Hamburger placeholder for mobile (actual toggle is in Sidebar) */}
        <button className="md:hidden mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
          {/* <Menu size={24} /> */}
        </button>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-[300px] hidden sm:flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-md leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="Search properties, tenants..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Mobile Search Icon */}
        <button className="sm:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 focus:outline-none">
          <Search size={20} />
        </button>
      </div>

      {/* Center: Optional Breadcrumb/Title */}
      <div className="hidden lg:flex items-center justify-center flex-1 font-medium text-gray-900 dark:text-gray-100">
        {/* Title goes here */}
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative focus:outline-none focus:ring-2 focus:ring-primary rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white dark:ring-[#171717]"></span>
          </button>
          
          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div 
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 border border-gray-100 dark:border-gray-800 z-50 transform origin-top-right transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-start cursor-pointer border-b border-gray-50 dark:border-gray-800/50 last:border-0 ${notif.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                    <div className="flex-shrink-0 pt-0.5">
                      <notif.icon size={16} className={notif.unread ? 'text-primary' : 'text-gray-400'} />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`text-sm ${notif.unread ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800">
                <Link href="/notifications" className="block text-center text-sm text-primary font-medium hover:underline">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#171717] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
              JA
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 border border-gray-100 dark:border-gray-800 z-50 transform origin-top-right transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@flatmitra.com</p>
              </div>
              <Link href="/settings/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <User size={16} className="mr-2 text-gray-400" />
                Your Profile
              </Link>
              <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Settings size={16} className="mr-2 text-gray-400" />
                Settings
              </Link>
              <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
              <button className="flex w-full items-center px-4 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left">
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
