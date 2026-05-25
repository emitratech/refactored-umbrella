"use client";

import React from "react";
import { IssueCard } from "@/components/cards/issue-card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TenantIssuesPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Track your maintenance issues.</p>
        </div>
        <Link href="/issues/new">
          <button className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full shadow-[0_4px_12px_rgba(91,72,189,0.4)] hover:bg-[#4a3a9b] transition-colors">
            <Plus size={20} />
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <button className="flex-1 py-1.5 text-sm font-bold bg-white dark:bg-gray-900 shadow-sm rounded-md text-gray-900 dark:text-white">Active (1)</button>
        <button className="flex-1 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Resolved (3)</button>
      </div>

      {/* Issue List */}
      <div className="space-y-4">
        <IssueCard
          id="REQ-4092"
          refNumber="#REQ-4092"
          date="Oct 12, 10:30 AM"
          title="Plumbing Leak in Bath"
          description="Water pooling near the sink cabinet. Needs to be checked before it damages the wood."
          property="Flat 402"
          priority="high"
          status="in-progress"
          updateText="Plumber assigned. Will visit tomorrow at 2 PM."
        />

        <div className="py-4 mt-8 flex items-center justify-center border-t border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-400">End of active requests</p>
        </div>
      </div>
    </div>
  );
}
