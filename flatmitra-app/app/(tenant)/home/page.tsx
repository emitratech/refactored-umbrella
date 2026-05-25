"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Card } from "@/components/cards/card";
import { Button } from "@/components/buttons/button";
import { AlertTriangle, Clock, CreditCard, FileText, Settings, ShieldCheck, Wrench } from "lucide-react";
import { StatusPipeline } from "@/components/charts/status-pipeline";

interface BillItem {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
}

interface IssueItem {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function TenantHomePage() {
  const { data: profileData, error: profileError, isLoading: profileLoading } = useSWR("/api/me", fetcher);
  const { data: billsData, error: billsError, isLoading: billsLoading } = useSWR("/api/bills", fetcher);
  const { data: issuesData, error: issuesError, isLoading: issuesLoading } = useSWR("/api/issues", fetcher);

  const quickActions = [
    { icon: CreditCard, label: "Pay Rent", color: "text-primary", bg: "bg-primary/10" },
    { icon: Wrench, label: "New Issue", color: "text-warning", bg: "bg-warning/10" },
    { icon: FileText, label: "Documents", color: "text-success", bg: "bg-success/10" },
    { icon: Settings, label: "Settings", color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-800" },
  ];

  const issueStages = [
    { id: "open", label: "Open" },
    { id: "in-progress", label: "Working" },
    { id: "resolved", label: "Done" },
  ];

  if (profileLoading || billsLoading || issuesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B48BD]"></div>
      </div>
    );
  }

  if (profileError || billsError || issuesError) {
    return (
      <div className="p-6 text-center bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-150 max-w-sm mx-auto mt-10">
        <AlertTriangle className="mx-auto text-danger mb-3" size={32} />
        <h3 className="font-bold text-gray-900 dark:text-white">Connection Error</h3>
        <p className="text-xs text-gray-500 mt-1">Failed to sync your tenant dashboard profile.</p>
      </div>
    );
  }

  const user = profileData?.user || { name: "Tenant" };
  const lease = profileData?.lease;
  const bills = (billsData || []) as BillItem[];
  const issues = (issuesData || []) as IssueItem[];

  // Compute pending dues
  const pendingBills = bills.filter(b => b.status === "pending" || b.status === "overdue");
  const totalDueAmount = pendingBills.reduce((sum, b) => sum + b.amount, 0);
  const nextDueDate = pendingBills.length > 0 
    ? new Date(pendingBills[0].dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) 
    : "No Dues";

  const initials = user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase();

  // Find active issue
  const activeIssue = issues.find(i => i.status !== "resolved");

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hi, {user.name}! 👋</h1>
          <p className="text-sm text-gray-500 mt-1">
            {lease ? `${lease.flat.unitNumber}, ${lease.flat.building.name}` : "No Active Lease"}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
          {initials}
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-primary rounded-2xl p-5 text-white shadow-[0_8px_24px_rgba(91,72,189,0.25)] relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <p className="text-white/80 text-sm font-medium mb-1">Total Amount Due</p>
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-3xl font-bold">₹{totalDueAmount.toLocaleString("en-IN")}</span>
        </div>
        
        <div className="flex items-center text-xs text-white/90 mb-5 bg-black/10 inline-flex px-3 py-1.5 rounded-full">
          <Clock size={12} className="mr-1.5" /> 
          {pendingBills.length > 0 ? `Due date: ${nextDueDate}` : "No outstanding bills"}
        </div>

        <Button 
          variant="secondary" 
          fullWidth 
          disabled={totalDueAmount === 0}
          className="bg-white text-primary hover:bg-gray-50 border-none shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Pay Now
        </Button>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <div key={i} className="flex flex-col items-center">
              <button className={`w-14 h-14 rounded-[16px] ${action.bg} flex items-center justify-center mb-2 active:scale-95 transition-transform`}>
                <action.icon className={action.color} size={24} />
              </button>
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 text-center">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Maintenance */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Active Request</h2>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        
        {activeIssue ? (
          <Card className="border-l-[3px] border-l-warning">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">{activeIssue.title}</h3>
              <span className="text-[10px] text-gray-400 font-mono">#REQ-{activeIssue.id.substring(0, 4).toUpperCase()}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4 line-clamp-1">{activeIssue.description}</p>
            
            <div className="pt-2">
              <StatusPipeline stages={issueStages} currentStage={activeIssue.status} variant="horizontal" />
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <span className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" /> Logged: {new Date(activeIssue.createdAt).toLocaleDateString()}
              </span>
              <Button variant="tertiary" size="sm" className="h-auto p-0 text-xs">Add Note</Button>
            </div>
          </Card>
        ) : (
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center text-xs text-gray-500">
            No active maintenance requests.
          </div>
        )}
      </div>

      {/* Important Notices */}
      <div>
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">Notices</h2>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex items-start space-x-3">
            <ShieldCheck size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Standard Security Drills</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Regular fire and safety checks happen weekly. Please keep common exit routes clear.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
