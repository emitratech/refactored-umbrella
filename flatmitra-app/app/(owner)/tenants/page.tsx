"use client";

import React from "react";
import { Button } from "@/components/buttons/button";
import { Search, Filter, Phone, Mail, MoreVertical, Building2 } from "lucide-react";
import { StatusBadge } from "@/components/badges/status-badge";

export default function TenantDirectoryPage() {
  const tenants = [
    { id: 1, name: "Sarah Jenkins", flat: "Flat 402, Oakwood", phone: "+1 (555) 123-4567", leaseEnd: "Oct 2024", status: "active", initials: "SJ", avatar: null, alert: "overdue" },
    { id: 2, name: "Michael Rodriguez", flat: "Flat 105, Pine Crest", phone: "+1 (555) 987-6543", leaseEnd: "Next Month", status: "kyc-pending", initials: "MR", avatar: null, alert: null },
    { id: 3, name: "Emily Chen", flat: "Villa 3, Palm Grove", phone: "+1 (555) 234-5678", leaseEnd: "Jan 2025", status: "active", initials: "EC", avatar: null, alert: null },
    { id: 4, name: "David Wilson", flat: "Flat 805, Gokuldham", phone: "+1 (555) 345-6789", leaseEnd: "Mar 2024", status: "inactive", initials: "DW", avatar: null, alert: null },
    { id: 5, name: "Anita Kumar", flat: "Flat 201, Sunrise", phone: "+1 (555) 456-7890", leaseEnd: "Dec 2023", status: "active", initials: "AK", avatar: null, alert: null },
    { id: 6, name: "James Thompson", flat: "Flat 602, Oakwood", phone: "+1 (555) 567-8901", leaseEnd: "Feb 2024", status: "active", initials: "JT", avatar: null, alert: null },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Tenant Directory</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage residents, view lease details, and monitor payment status.</p>
        </div>
        <Button variant="primary">Onboard New Tenant</Button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <Button variant="secondary" size="sm" icon={<Filter size={14} />}>All Statuses</Button>
          <Button variant="secondary" size="sm" icon={<Building2 size={14} />}>Building</Button>
        </div>
        
        <div className="flex items-center w-full sm:w-auto space-x-4">
          <span className="text-sm text-gray-500 hidden md:block">Showing {tenants.length} Tenants</span>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search tenants, flats..." 
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-primary rounded-md focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tenant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow">
            
            {/* Card Header: Avatar & Menu */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                {tenant.avatar ? (
                  <img src={tenant.avatar} alt={tenant.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                    {tenant.initials}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{tenant.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{tenant.flat}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone size={14} className="mr-2 text-gray-400" />
                {tenant.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {tenant.leaseEnd.includes("Next") ? (
                  <span className="text-warning font-medium">Expiring: {tenant.leaseEnd}</span>
                ) : (
                  <span>Lease ends: {tenant.leaseEnd}</span>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <StatusBadge status={tenant.status as any} size="sm" />
              {tenant.alert === "overdue" && (
                <StatusBadge status="overdue" size="sm" />
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
