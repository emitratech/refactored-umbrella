import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlatMitra | Smart Flat Management Tool & Property Management Tool",
  description:
    "FlatMitra (by Flat eMitra) is India's leading flat management tool and property management tool. Manage tenants, rent collection, KYC, and WhatsApp automation.",
  metadataBase: new URL("https://flat.emitra.dev"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/icon-512.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "FlatMitra | Smart Flat Management Tool & Property Management Tool",
    description:
      "FlatMitra is India's smartest flat management tool and property management tool for rent collection, KYC, and tenant management.",
    url: "https://flat.emitra.dev",
    siteName: "FlatMitra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlatMitra — Flat Management Tool for India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlatMitra | Smart Flat Management Tool",
    description:
      "Rent collection, KYC, and real-time reporting with Flat eMitra. The ultimate flat management tool for Indian landlords.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4338ca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Manrope:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
