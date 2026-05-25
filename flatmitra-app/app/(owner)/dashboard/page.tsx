"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { StatCard } from "@/components/cards/stat-card";
import { Card } from "@/components/cards/card";
import { ProgressBar } from "@/components/charts/charts";
import { Button } from "@/components/buttons/button";
import { Building2, IndianRupee, AlertTriangle, Users, RefreshCw } from "lucide-react";
import { IssueCard } from "@/components/cards/issue-card";

interface PaymentItem {
  name: string;
  building: string;
  flat: string;
  amount: string;
  time: string;
  initials: string;
}

export default function OwnerDashboard() {
  const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading, mutate: mutateDashboard } = useSWR("/api/dashboard", fetcher);
  const { data: buildingsData, error: buildingsError, isLoading: buildingsLoading, mutate: mutateBuildings } = useSWR("/api/buildings", fetcher);

  const handleSync = async () => {
    await Promise.all([mutateDashboard(), mutateBuildings()]);
  };

  if (dashboardLoading || buildingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B48BD]"></div>
      </div>
    );
  }

  if (dashboardError || buildingsError) {
    return (
      <div className="text-center py-12 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-150 p-6 max-w-md mx-auto mt-12 shadow-sm">
        <AlertTriangle className="mx-auto text-danger mb-4" size={40} />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Failed to load dashboard</h3>
        <p className="text-sm text-gray-500 mt-1">Please ensure your database connection is active and try again.</p>
        <Button onClick={handleSync} className="mt-6" variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  const {
    revenueThisMonth,
    totalFlats,
    occupiedFlats,
    vacantFlats,
    pendingDues,
    urgentIssues,
    recentPayments,
    expenseBreakdown
  } = dashboardData || {
    revenueThisMonth: 0,
    totalFlats: 0,
    occupiedFlats: 0,
    vacantFlats: 0,
    pendingDues: 0,
    urgentIssues: 0,
    recentPayments: [],
    expenseBreakdown: { maintenance: 0, salary: 0, utilities: 0 }
  };

  const buildings = buildingsData || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={handleSync} icon={<RefreshCw size={16} />}>Sync Data</Button>
          <Button variant="primary">Generate Report</Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Revenue This Month" 
          value={`₹${revenueThisMonth.toLocaleString("en-IN")}`} 
          icon={<IndianRupee size={20} />} 
          progress={revenueThisMonth > 0 ? 100 : 0}
          subtitle="Collected current billing cycle"
        />
        <StatCard 
          title="Total Flats" 
          value={totalFlats.toString()} 
          icon={<Building2 size={20} />} 
          progress={totalFlats > 0 ? (occupiedFlats / totalFlats) * 100 : 0}
          subtitle={`${occupiedFlats} Occupied • ${vacantFlats} Vacant`}
        />
        <StatCard 
          title="Pending Dues" 
          value={`₹${pendingDues.toLocaleString("en-IN")}`} 
          icon={<Users size={20} />} 
          className={pendingDues > 0 ? "[&_p.text-\\[28px\\]]:text-danger" : ""}
          subtitle="Dues outstanding"
        />
        <StatCard 
          title="Urgent Issues" 
          value={urgentIssues.toString()} 
          icon={<AlertTriangle size={20} className={urgentIssues > 0 ? "text-danger" : ""} />} 
          className={urgentIssues > 0 ? "[&_p.text-\\[28px\\]]:text-danger" : ""}
          subtitle="Require immediate action"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Takes up 2/3 on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Building Collections */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[24px] font-bold text-gray-900 dark:text-white">Building Collections</h2>
              <a href="/buildings" className="text-sm font-medium text-primary hover:underline">See all buildings</a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {buildings.length > 0 ? (
                buildings.slice(0, 2).map((building: any) => {
                  const bFlats = building.flats || [];
                  const occupiedCount = bFlats.filter((f: any) => f.status === "occupied").length;
                  const progress = bFlats.length > 0 ? (occupiedCount / bFlats.length) * 100 : 0;
                  return (
                    <Card key={building.id} title={building.name} subtitle={building.location}>
                      <div className="mt-2 space-y-4">
                        <ProgressBar percentage={progress} label="Occupancy Progress" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Occupied: <span className="text-gray-900 dark:text-white font-medium">{occupiedCount} flats</span></span>
                          <span className="text-gray-500">Total: <span className="font-medium">{bFlats.length} flats</span></span>
                        </div>
                        <Button variant="secondary" fullWidth size="sm" className="mt-2">Send Reminders</Button>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-2 bg-white dark:bg-[#1a1a1a] border border-gray-150 rounded-xl p-8 text-center text-gray-500 text-sm">
                  No buildings configured. Click "See all buildings" to add one.
                </div>
              )}
            </div>
          </div>

          {/* Recent Payments Feed */}
          <Card 
            title="Recent Payments Feed" 
            actions={[<button key="1" onClick={handleSync} className="text-gray-400 hover:text-primary"><RefreshCw size={16} /></button>]}
          >
            <div className="space-y-4">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment: PaymentItem, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {payment.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{payment.name}</p>
                        <p className="text-xs text-gray-500">{payment.building} • Flat {payment.flat}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-success">{payment.amount}</p>
                      <p className="text-xs text-gray-500">{payment.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">
                  No payments received in this cycle yet.
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column (Takes up 1/3 on desktop) */}
        <div className="space-y-6">
          {/* Expense Breakdown */}
          <Card title="Expense Breakdown" subtitle="Current Month">
            <div className="space-y-4 mt-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Maintenance & Repairs</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{expenseBreakdown.maintenance.toLocaleString("en-IN")}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${expenseBreakdown.maintenance > 0 ? 50 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Staff Salaries</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{expenseBreakdown.salary.toLocaleString("en-IN")}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-400" 
                    style={{ width: `${expenseBreakdown.salary > 0 ? 33 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Utilities (Common)</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{expenseBreakdown.utilities.toLocaleString("en-IN")}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-300" 
                    style={{ width: `${expenseBreakdown.utilities > 0 ? 17 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
