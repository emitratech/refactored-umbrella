"use client";

import React from "react";
import { StatCard } from "@/components/cards/stat-card";
import { Card } from "@/components/cards/card";
import { BarChart } from "@/components/charts/charts";
import { ChevronDown, Download, IndianRupee, MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/badges/status-badge";
import { Button } from "@/components/buttons/button";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BillingPage() {
  const collectionData = [
    { month: "May", expected: 500000, collected: 480000 },
    { month: "Jun", expected: 500000, collected: 490000 },
    { month: "Jul", expected: 520000, collected: 500000 },
    { month: "Aug", expected: 520000, collected: 450000 },
    { month: "Sep", expected: 550000, collected: 530000 },
    { month: "Oct", expected: 550000, collected: 420000 }, // Current month, lower collected so far
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Billing & Collections</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage rent payments, track delinquencies, and analyze trends.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            October 2023 <ChevronDown size={16} className="ml-2" />
          </button>
          <Button variant="primary" icon={<Download size={16} />}>Export</Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Expected" value="₹5,50,000" icon={<IndianRupee size={20} />} />
        <StatCard 
          title="Collected (76%)" 
          value="₹4,20,000" 
          icon={<IndianRupee size={20} className="text-success" />} 
          progress={76}
          className="border-l-[4px] border-l-success"
        />
        <StatCard 
          title="Pending" 
          value="₹85,000" 
          icon={<IndianRupee size={20} className="text-warning" />} 
          className="border-l-[4px] border-l-warning"
        />
        <StatCard 
          title="Overdue" 
          value="₹45,000" 
          icon={<IndianRupee size={20} className="text-danger" />} 
          className="border-l-[4px] border-l-danger [&_p.text-\\[28px\\]]:text-danger"
          subtitle="From previous months"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          <Card title="Collection Trend" subtitle="Expected vs Actual Collections (Last 6 Months)">
            <BarChart data={collectionData} height={300} />
          </Card>

          <Card title="Recent Transactions" actions={[<Button key="1" variant="tertiary" size="sm">View All</Button>]}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-gray-500 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="pb-3 font-medium">DATE</th>
                    <th className="pb-3 font-medium">TENANT</th>
                    <th className="pb-3 font-medium">PROPERTY</th>
                    <th className="pb-3 font-medium">METHOD</th>
                    <th className="pb-3 font-medium text-right">AMOUNT</th>
                    <th className="pb-3 font-medium text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    { date: "Oct 15, 2023", tenant: "Arjun Mehta", prop: "Gokuldham • 402", method: "UPI", amt: "₹24,500", status: "paid" },
                    { date: "Oct 14, 2023", tenant: "Priya Singh", prop: "Sunrise • 101", method: "Bank Transfer", amt: "₹32,000", status: "paid" },
                    { date: "Oct 12, 2023", tenant: "Rahul Arora", prop: "Gokuldham • 805", method: "Credit Card", amt: "₹18,500", status: "paid" },
                    { date: "Oct 10, 2023", tenant: "Amit Kumar", prop: "Palm Grove • Villa 3", method: "UPI", amt: "₹45,000", status: "paid" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 text-gray-500">{row.date}</td>
                      <td className="py-4 font-medium text-gray-900 dark:text-gray-100">{row.tenant}</td>
                      <td className="py-4 text-gray-600 dark:text-gray-400">{row.prop}</td>
                      <td className="py-4 text-gray-500">{row.method}</td>
                      <td className="py-4 font-bold text-gray-900 dark:text-gray-100 text-right">{row.amt}</td>
                      <td className="py-4 text-center"><StatusBadge status={row.status as any} size="sm" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          <Card title="Defaulters & Dues" subtitle="Requires follow-up">
            <div className="space-y-4 mt-2">
              {[
                { name: "Suresh Pillai", prop: "Sunrise Towers • Flat 204", amount: "₹32,000", days: "15 days overdue", initials: "SP" },
                { name: "Vikram Malhotra", prop: "Gokuldham • Flat 601", amount: "₹18,500", days: "5 days overdue", initials: "VM" },
                { name: "Deepak Sharma", prop: "Palm Grove • Villa 2", amount: "₹45,000", days: "Pending (Due Today)", initials: "DS", isPending: true },
              ].map((defaulter, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-400">
                      {defaulter.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{defaulter.name}</p>
                      <p className="text-xs text-gray-500">{defaulter.prop}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className={cn("text-sm font-bold", defaulter.isPending ? "text-warning" : "text-danger")}>
                      {defaulter.amount}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{defaulter.days}</p>
                    <button className="text-[10px] text-primary font-medium mt-1 hover:underline">Send Reminder</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="secondary" fullWidth>View All Delinquencies</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
