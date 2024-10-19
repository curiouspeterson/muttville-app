// Import necessary dependencies and styles
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/Header";
import "./globals.css";
import { clerkConfig } from '@/lib/clerk';
import { Toaster } from "@/components/ui/toaster"

// Define custom fonts using next/font/local
// These fonts will be available as CSS variables
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900", // Supports a range of font weights
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900", // Supports a range of font weights
});

// Define metadata for the application
// This will be used by Next.js for SEO and document head
export const metadata: Metadata = {
  title: "Muttville Schedules",
  description: "Scheduling app for Muttville Senior Dog Rescue",
};

// Root layout component that wraps all pages
// This component is used by Next.js to structure the app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider {...clerkConfig}>
      <html lang="en">
        <body
          // Apply custom fonts and antialiasing to the body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main className="container mx-auto p-4">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
