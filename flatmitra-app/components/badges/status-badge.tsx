import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type StatusType = 
  | "active" 
  | "inactive" 
  | "paid" 
  | "overdue" 
  | "pending" 
  | "resolved" 
  | "kyc-pending";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
  className?: string;
  label?: string; // Optional override for the text
}

export function StatusBadge({ status, size = "md", className, label }: StatusBadgeProps) {
  
  const statusConfig: Record<StatusType, { bg: string; text: string; defaultLabel: string }> = {
    active: { bg: "bg-success", text: "text-white", defaultLabel: "ACTIVE" },
    paid: { bg: "bg-success", text: "text-white", defaultLabel: "PAID" },
    resolved: { bg: "bg-success", text: "text-white", defaultLabel: "RESOLVED" },
    
    overdue: { bg: "bg-danger", text: "text-white", defaultLabel: "OVERDUE" },
    
    pending: { bg: "bg-warning", text: "text-white", defaultLabel: "PENDING" },
    "kyc-pending": { bg: "bg-warning", text: "text-white", defaultLabel: "KYC PENDING" },
    
    inactive: { bg: "bg-gray-500", text: "text-white", defaultLabel: "INACTIVE" },
  };

  const config = statusConfig[status] || statusConfig.inactive;
  
  const sizeClasses = {
    sm: "px-3 py-1 text-[10px]",
    md: "px-4 py-1.5 text-[11px]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full uppercase tracking-wider leading-none",
        config.bg,
        config.text,
        sizeClasses[size],
        className
      )}
    >
      {label || config.defaultLabel}
    </span>
  );
}
