import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode[];
  children: React.ReactNode;
  hoverable?: boolean;
  borderAccentColor?: "default" | "primary" | "success" | "danger" | "warning";
  fullHeight?: boolean;
  className?: string;
}

export function Card({
  title,
  subtitle,
  actions,
  children,
  hoverable = false,
  borderAccentColor,
  fullHeight = false,
  className,
}: CardProps) {
  
  const borderColors = {
    default: "",
    primary: "border-l-[4px] border-l-primary",
    success: "border-l-[4px] border-l-success",
    danger: "border-l-[4px] border-l-danger",
    warning: "border-l-[4px] border-l-warning",
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden transition-all",
        hoverable && "hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
        fullHeight && "h-full",
        borderAccentColor && borderColors[borderAccentColor],
        className
      )}
    >
      {(title || subtitle || (actions && actions.length > 0)) && (
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start md:items-center flex-col md:flex-row gap-3">
          <div>
            {title && <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {actions && actions.length > 0 && (
            <div className="flex items-center space-x-2">
              {actions.map((action, i) => (
                <React.Fragment key={i}>{action}</React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="p-5 flex-grow text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
