import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";

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

        {children}
      </body>
    </html>
  );
}
