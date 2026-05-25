import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    direction: "up" | "down";
    percentage: number;
  };
  progress?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  progress,
  icon,
  onClick,
  className,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white dark:bg-[#1a1a1a] rounded-xl p-4 md:p-5 border border-gray-100 dark:border-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-all",
        onClick && "cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>

      <div className="flex items-baseline space-x-2 my-1">
        <p className="text-[28px] font-bold text-primary tracking-tight">{value}</p>
        {trend && (
          <div
            className={cn(
              "flex items-center text-xs font-medium px-1.5 py-0.5 rounded",
              trend.direction === "up" 
                ? "text-success bg-success/10" 
                : "text-danger bg-danger/10"
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight size={14} className="mr-0.5" />
            ) : (
              <ArrowDownRight size={14} className="mr-0.5" />
            )}
            {trend.percentage}%
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 my-3 overflow-hidden">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </div>
      )}

      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
