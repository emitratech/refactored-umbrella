"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Download, Receipt } from "lucide-react";
import { StatusBadge } from "../badges/status-badge";
import { Button } from "../buttons/button";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BillItem {
  label: string;
  amount: number;
}

interface BillCardProps {
  month: string;
  amount: number;
  status: "paid" | "overdue" | "pending";
  items?: BillItem[];
  onPayNow?: () => void;
  onDownloadReceipt?: () => void;
  defaultExpanded?: boolean;
}

export function BillCard({
  month,
  amount,
  status,
  items = [],
  onPayNow,
  onDownloadReceipt,
  defaultExpanded = false,
}: BillCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300">
      {/* Header - Always visible, clickable to expand */}
      <div 
        className={cn(
          "px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
          expanded && "border-b border-gray-100 dark:border-gray-800"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col">
          <span className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100">{month}</span>
          <span className="text-lg md:text-xl font-bold text-primary mt-0.5">{formatCurrency(amount)}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <StatusBadge status={status} />
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 space-y-4">
          {/* Itemized Breakdown */}
          {items.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Breakdown</h4>
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(item.amount)}</span>
                </div>
              ))}
              <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">Total Due</span>
                <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">{formatCurrency(amount)}</span>
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="pt-2 mt-4 flex items-center justify-between">
            {status === "paid" ? (
              <button 
                onClick={(e) => { e.stopPropagation(); if(onDownloadReceipt) onDownloadReceipt(); }}
                className="flex items-center text-sm font-medium text-primary hover:text-[#4a3a9b] transition-colors"
              >
                <Download size={16} className="mr-1.5" />
                Download Receipt
              </button>
            ) : (
              <Button 
                variant="primary" 
                fullWidth 
                onClick={(e) => { e.stopPropagation(); if(onPayNow) onPayNow(); }}
                icon={<Receipt size={16} />}
              >
                Pay {formatCurrency(amount)} Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
