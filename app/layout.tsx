import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGT = Space_Grotesk({
  variable: "--font-spaceGT",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tasktrack",
  description: "Easy and effective task management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGT.variable} antialiased`}>
        <Topbar />
        <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    className: 'text-sm font-medium',
    style: {
      padding: '12px 16px',
      borderRadius: '8px',
      background: '#fff',
      color: '#333',
      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    },
  }}
/>

        {children}
      </body>
    </html>
  );
}
