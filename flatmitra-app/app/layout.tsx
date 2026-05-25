import type { Metadata, Viewport } from "next";
import { RootProviders } from "@/components/providers/root-providers";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: "FlatMitra - Property Management SaaS",
  description: "Comprehensive property management solution for modern real estate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans text-body bg-white dark:bg-[#0a0a0a] text-[#171717] dark:text-[#ededed]">
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
