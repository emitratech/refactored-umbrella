"use client";

import React from "react";
import { Card } from "@/components/cards/card";
import { LineChart, BarChart } from "@/components/charts/charts";
import { Button } from "@/components/buttons/button";
import { Download, Calendar, FileText } from "lucide-react";

export default function ReportsPage() {
  const financialData = [
    { month: "May", expected: 450000, actual: 440000 },
    { month: "Jun", expected: 450000, actual: 445000 },
    { month: "Jul", expected: 480000, actual: 470000 },
    { month: "Aug", expected: 480000, actual: 460000 },
    { month: "Sep", expected: 500000, actual: 495000 },
    { month: "Oct", expected: 500000, actual: 420000 },
  ];

  const occupancyData = [
    { month: "May", expected: 100, collected: 90 }, // Using expected/collected keys to reuse BarChart component
    { month: "Jun", expected: 100, collected: 90 },
    { month: "Jul", expected: 100, collected: 92 },
    { month: "Aug", expected: 100, collected: 92 },
    { month: "Sep", expected: 100, collected: 95 },
    { month: "Oct", expected: 100, collected: 95 },
  ];

  const standardReports = [
    { title: "Monthly Rent Roll", desc: "Detailed list of all active leases, rent amounts, and current status.", date: "Oct 2023" },
    { title: "Income & Expense Statement", desc: "Comprehensive P&L statement aggregated across all properties.", date: "Q3 2023" },
    { title: "Delinquency Report", desc: "List of all overdue payments with aging buckets (30/60/90 days).", date: "As of Today" },
    { title: "Maintenance Request Summary", desc: "Metrics on issue resolution times and costs.", date: "Last 30 Days" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate financial statements and analyze property performance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={<Calendar size={16} />}>Last 6 Months</Button>
          <Button variant="primary">Generate Custom Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts */}
        <Card title="Revenue Performance" subtitle="Expected vs Actual Income (INR)">
          <div className="mt-4">
            <LineChart data={financialData} height={320} />
          </div>
        </Card>

        <Card title="Occupancy Rate" subtitle="Percentage of units occupied">
          <div className="mt-4">
            <BarChart data={occupancyData} height={320} />
          </div>
        </Card>
      </div>

      {/* Standard Reports */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Standard Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {standardReports.map((report, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-start justify-between hover:border-primary transition-colors cursor-pointer group">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{report.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{report.desc}</p>
                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold text-gray-600 dark:text-gray-400 rounded">
                  {report.date}
                </span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-primary p-2">
              <Download size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
