"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

// 1. BarChart Component
interface BarChartProps {
  data: any[];
  height?: number;
  title?: string;
  className?: string;
}

export function BarChart({ data, height = 300, title, className }: BarChartProps) {
  return (
    <div className={`w-full ${className || ""}`}>
      {title && <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{title}</h4>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            barSize={32}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6B7280" }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6B7280" }} 
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }} />
            <Bar dataKey="expected" name="Expected" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            <Bar dataKey="collected" name="Collected" fill="#5B48BD" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 2. LineChart Component
interface LineChartProps {
  data: any[];
  height?: number;
  title?: string;
}

export function LineChart({ data, height = 300, title }: LineChartProps) {
  return (
    <div className="w-full">
      {title && <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{title}</h4>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6B7280" }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6B7280" }} 
            />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }} />
            <Line 
              type="monotone" 
              dataKey="expected" 
              name="Expected" 
              stroke="#9CA3AF" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={{ r: 0 }} 
              activeDot={{ r: 4 }} 
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              name="Actual" 
              stroke="#5B48BD" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} 
              activeDot={{ r: 6, strokeWidth: 0, fill: "#5B48BD" }} 
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 3. ProgressBar Component
interface ProgressBarProps {
  percentage: number;
  label?: string;
  colorClass?: string;
  showPercentageText?: boolean;
}

export function ProgressBar({ 
  percentage, 
  label, 
  colorClass = "bg-primary", 
  showPercentageText = true 
}: ProgressBarProps) {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  
  return (
    <div className="w-full flex flex-col justify-center">
      {(label || showPercentageText) && (
        <div className="flex justify-between items-end mb-1.5">
          {label && <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>}
          {showPercentageText && <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{safePercentage}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${safePercentage}%` }}
        />
      </div>
    </div>
  );
}
