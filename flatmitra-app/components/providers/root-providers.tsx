"use client";

import React from "react";

// In a complete application, you would replace these mocks with actual providers 
// like NextAuth for Authentication, next-themes for Theme management, etc.

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function NotificationProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
