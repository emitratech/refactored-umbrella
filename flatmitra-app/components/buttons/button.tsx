import React from "react";
import { Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-primary text-white hover:bg-[#4a3a9b] focus:ring-primary shadow-sm active:shadow-inner",
      secondary: "bg-white text-primary border border-primary hover:bg-gray-50 focus:ring-primary shadow-sm",
      tertiary: "bg-transparent text-primary hover:underline focus:ring-primary",
      danger: "bg-danger text-white hover:bg-red-600 focus:ring-danger shadow-sm active:shadow-inner",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-400",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded",
      md: "h-11 px-4 text-sm rounded-md", // 44px
      lg: "h-12 px-6 text-base rounded-md", // 48px
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && icon && <span className="mr-2">{icon}</span>}
        <span className={isLoading ? "opacity-70" : ""}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
