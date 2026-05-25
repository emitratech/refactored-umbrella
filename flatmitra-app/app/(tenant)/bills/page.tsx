"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { BillCard } from "@/components/cards/bill-card";
import { Download, RefreshCw, AlertTriangle } from "lucide-react";

interface BillItem {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  paidAt?: string;
}

export default function TenantBillsPage() {
  const { data: billsData, error, isLoading, mutate } = useSWR("/api/bills", fetcher);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B48BD]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-150 max-w-sm mx-auto mt-10">
        <AlertTriangle className="mx-auto text-danger mb-3" size={32} />
        <h3 className="font-bold text-gray-900 dark:text-white">Connection Error</h3>
        <p className="text-xs text-gray-500 mt-1">Failed to sync your rent bills.</p>
      </div>
    );
  }

  const bills = (billsData || []) as BillItem[];

  // Pending/Overdue bills
  const pendingBills = bills.filter(b => b.status === "pending" || b.status === "overdue");

  // Paid bills
  const paidBills = bills.filter(b => b.status === "paid");

  const formatDateLabel = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  };

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bills</h1>
          <p className="text-sm text-gray-500 mt-1">Payment history and dues.</p>
        </div>
        <button 
          onClick={() => mutate()}
          className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 dark:bg-gray-900 rounded-full"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Current Due Section */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Current Due</h2>
        {pendingBills.length > 0 ? (
          pendingBills.map(bill => (
            <BillCard
              key={bill.id}
              month={formatDateLabel(bill.dueDate)}
              amount={bill.amount}
              status={bill.status as any}
              defaultExpanded={true}
              items={[
                { label: "Base Rent + Maintenance", amount: bill.amount }
              ]}
              onPayNow={() => console.log('Initiate Payment for', bill.id)}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center text-xs text-gray-500">
            All caught up! No pending dues.
          </div>
        )}
      </div>

      {/* Past Bills Section */}
      <div>
        <div className="flex justify-between items-center mb-3 mt-8">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Past Bills</h2>
          <button className="text-xs text-primary font-medium flex items-center">
            <Download size={14} className="mr-1" /> Statement
          </button>
        </div>
        
        <div className="space-y-4">
          {paidBills.length > 0 ? (
            paidBills.map(bill => (
              <BillCard
                key={bill.id}
                month={bill.paidAt ? formatDateLabel(bill.paidAt) : formatDateLabel(bill.dueDate)}
                amount={bill.amount}
                status="paid"
                items={[
                  { label: "Base Rent + Maintenance", amount: bill.amount }
                ]}
                onDownloadReceipt={() => console.log('Download receipt for', bill.id)}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center text-xs text-gray-500">
              No payment history available.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
