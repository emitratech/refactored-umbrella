"use client";

import React, { useState } from "react";
import { AlertTriangle, Clock, MoreVertical, User } from "lucide-react";
import { StatusPipeline } from "../charts/status-pipeline";
import { Button } from "../buttons/button";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Inline PriorityBadge since it wasn't requested explicitly but used here
function PriorityBadgeInline({ priority }: { priority: "high" | "medium" | "low" }) {
  const configs = {
    high: { bg: "bg-danger", icon: AlertTriangle, label: "HIGH" },
    medium: { bg: "bg-warning", icon: AlertTriangle, label: "MED" },
    low: { bg: "bg-success", icon: null, label: "LOW" },
  };
  const config = configs[priority];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider", config.bg)}>
      {Icon && <Icon size={10} strokeWidth={3} />}
      <span>{config.label}</span>
    </div>
  );
}

interface IssueCardProps {
  id: string;
  refNumber?: string;
  date: string;
  title: string;
  description: string;
  property: string;
  priority: "high" | "medium" | "low";
  status: "open" | "assigned" | "in-progress" | "resolved";
  assignee?: { name: string; avatar?: string };
  updateText?: string;
  onAssign?: () => void;
  onUpdate?: () => void;
}

export function IssueCard({
  id,
  refNumber,
  date,
  title,
  description,
  property,
  priority,
  status,
  assignee,
  updateText,
  onAssign,
  onUpdate,
}: IssueCardProps) {
  const [expanded, setExpanded] = useState(false);

  const borderColors = {
    high: "border-l-danger",
    medium: "border-l-warning",
    low: "border-l-success",
  };

  const stages = [
    { id: "open", label: "Open" },
    { id: "assigned", label: "Assigned" },
    { id: "in-progress", label: "In Progress" },
    { id: "resolved", label: "Resolved" },
  ];

  return (
    <div 
      className={cn(
        "bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer border-l-[4px]",
        borderColors[priority]
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 flex items-center mb-1">
              <Clock size={12} className="mr-1" /> {date}
            </span>
            {refNumber && <span className="text-[10px] font-mono text-gray-400">{refNumber}</span>}
          </div>
          <PriorityBadgeInline priority={priority} />
        </div>

        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1">{title}</h3>
          <p className="text-xs font-medium text-primary mb-2">{property}</p>
          <p className={cn(
            "text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-all",
            !expanded && "line-clamp-2"
          )}>
            {description}
          </p>
        </div>

        {/* Status Pipeline */}
        <div className="my-4 pt-2">
          <StatusPipeline stages={stages} currentStage={status} />
        </div>

        {/* Expanded actions and assignee */}
        {expanded && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
            {updateText && (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg mb-4 border border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 font-medium mb-1">Latest Update:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{updateText}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {assignee ? (
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                    {assignee.avatar ? (
                      <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full mr-2" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <User size={12} className="text-primary" />
                      </div>
                    )}
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{assignee.name}</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-gray-400 italic">Unassigned</span>
                )}
              </div>
              
              <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                {status === "open" && onAssign && (
                  <Button variant="primary" size="sm" onClick={onAssign}>Assign</Button>
                )}
                {status !== "open" && status !== "resolved" && onUpdate && (
                  <Button variant="secondary" size="sm" onClick={onUpdate}>Update</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
