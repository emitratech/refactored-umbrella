"use client";

import React from "react";
import { Button } from "@/components/buttons/button";
import { Card } from "@/components/cards/card";
import { StatCard } from "@/components/cards/stat-card";
import { DataTable } from "@/components/tables/data-table";
import { ProgressBar } from "@/components/charts/charts";
import { Plus, Filter, Download, ArrowUpRight, ArrowDownRight, Receipt } from "lucide-react";
import { StatusBadge } from "@/components/badges/status-badge";

export default function ExpensesPage() {
  const expenseColumns = [
    { key: "date", label: "DATE", width: "120px" },
    { key: "category", label: "CATEGORY" },
    { key: "vendor", label: "VENDOR/PAYEE" },
    { key: "property", label: "PROPERTY" },
    { key: "amount", label: "AMOUNT", align: "right" as const },
    { key: "status", label: "STATUS", align: "center" as const },
  ];

  const expensesData = [
    { id: 1, date: "24 Oct 2023", category: "Maintenance", vendor: "Otis Elevators", property: "Gokuldham Heights", amount: "₹15,000", status: <StatusBadge status="paid" /> },
    { id: 2, date: "22 Oct 2023", category: "Utilities", vendor: "Municipal Corp", property: "Sunrise Towers", amount: "₹8,500", status: <StatusBadge status="paid" /> },
    { id: 3, date: "18 Oct 2023", category: "Staff Salary", vendor: "Security Team", property: "All Properties", amount: "₹45,000", status: <StatusBadge status="paid" /> },
    { id: 4, date: "15 Oct 2023", category: "Repairs", vendor: "Raj Plumbing", property: "Palm Grove Villa", amount: "₹3,200", status: <StatusBadge status="paid" /> },
    { id: 5, date: "10 Oct 2023", category: "Legal & Admin", vendor: "City Law Firm", property: "Corporate", amount: "₹12,000", status: <StatusBadge status="pending" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Expense Tracking</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor property maintenance costs, salaries, and utility bills.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={<Download size={16} />}>Export</Button>
          <Button variant="primary" icon={<Plus size={16} />}>Log Expense</Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Expenses (Oct)" 
          value="₹83,700" 
          icon={<Receipt size={20} />} 
          trend={{ direction: "up", percentage: 12 }}
        />
        <StatCard 
          title="Pending Payments" 
          value="₹12,000" 
          icon={<Receipt size={20} className="text-warning" />} 
          className="border-l-[4px] border-l-warning"
        />
        <StatCard 
          title="Avg Expense / Property" 
          value="₹27,900" 
          icon={<Receipt size={20} className="text-gray-400" />} 
          trend={{ direction: "down", percentage: 4 }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (1/3): Breakdown */}
        <div className="space-y-6">
          <Card title="Category Breakdown" subtitle="October 2023">
            <div className="space-y-6 mt-4">
              <ProgressBar percentage={55} label="Staff Salary (₹45,000)" colorClass="bg-primary" />
              <ProgressBar percentage={18} label="Maintenance (₹15,000)" colorClass="bg-indigo-400" />
              <ProgressBar percentage={15} label="Legal & Admin (₹12,000)" colorClass="bg-blue-400" />
              <ProgressBar percentage={10} label="Utilities (₹8,500)" colorClass="bg-success" />
              <ProgressBar percentage={2} label="Repairs (₹3,200)" colorClass="bg-warning" />
            </div>
          </Card>
          
          <Card title="Budget Variance" className="bg-gray-50 dark:bg-gray-900/50">
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-1">You are currently</p>
              <p className="text-2xl font-bold text-success mb-1">₹16,300 under budget</p>
              <p className="text-sm text-gray-500">for October 2023</p>
            </div>
          </Card>
        </div>

        {/* Right Column (2/3): Table */}
        <div className="lg:col-span-2">
          <Card 
            title="Recent Expenses" 
            actions={[
              <Button key="1" variant="secondary" size="sm" icon={<Filter size={14} />}>Filter</Button>
            ]}
          >
            <div className="mt-2 border rounded-lg overflow-hidden border-gray-200 dark:border-gray-800">
              <DataTable 
                columns={expenseColumns} 
                data={expensesData} 
                onRowClick={() => {}}
              />
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
