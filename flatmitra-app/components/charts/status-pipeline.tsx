import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Stage {
  id: string;
  label: string;
}

interface StatusPipelineProps {
  stages: Stage[];
  currentStage: string;
  variant?: "horizontal" | "vertical";
  colors?: { past?: string; current?: string; future?: string };
  className?: string;
}

export function StatusPipeline({
  stages,
  currentStage,
  variant = "horizontal",
  colors,
  className,
}: StatusPipelineProps) {
  const currentIndex = stages.findIndex((s) => s.id === currentStage);
  
  const pastColor = colors?.past || "bg-gray-400 dark:bg-gray-500 border-gray-400 dark:border-gray-500";
  const currentColor = colors?.current || "bg-primary border-primary";
  const futureColor = colors?.future || "bg-transparent border-gray-300 dark:border-gray-600";
  
  const pastLineColor = "bg-primary";
  const futureLineColor = "bg-gray-200 dark:bg-gray-700";

  if (variant === "vertical") {
    return (
      <div className={cn("flex flex-col space-y-0", className)}>
        {stages.map((stage, index) => {
          const isPast = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="flex flex-col items-start relative">
              <div className="flex items-center">
                <div 
                  className={cn(
                    "w-3 h-3 rounded-full border-2 z-10 flex-shrink-0",
                    isPast && pastColor,
                    isCurrent && currentColor,
                    isFuture && futureColor
                  )}
                />
                <span className={cn(
                  "ml-3 text-xs font-semibold uppercase tracking-wider",
                  isCurrent ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                )}>
                  {stage.label}
                </span>
              </div>
              {!isLast && (
                <div 
                  className={cn(
                    "w-[2px] h-6 ml-[5px] my-1",
                    isPast || isCurrent ? pastLineColor : futureLineColor
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className={cn("flex items-center justify-between w-full relative pt-2 pb-5", className)}>
      {/* Background connecting line */}
      <div className="absolute top-3.5 left-[5%] right-[5%] h-[2px] bg-gray-200 dark:bg-gray-700 z-0" />
      
      {/* Active connecting line */}
      <div 
        className="absolute top-3.5 left-[5%] h-[2px] bg-primary z-0 transition-all duration-500 ease-out" 
        style={{ width: `${Math.max(0, (currentIndex / (stages.length - 1)) * 90)}%` }}
      />
      
      {stages.map((stage, index) => {
        const isPast = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;

        return (
          <div key={stage.id} className="flex flex-col items-center relative z-10 w-[20%]">
            <div 
              className={cn(
                "w-4 h-4 rounded-full border-[3px] bg-white dark:bg-[#1a1a1a] transition-colors duration-300",
                isPast && pastColor,
                isCurrent && currentColor,
                isFuture && futureColor
              )}
            />
            <span className={cn(
              "absolute top-6 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap text-center transition-colors duration-300",
              isCurrent ? "text-primary" : "text-gray-500 dark:text-gray-400"
            )}>
              {stage.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
