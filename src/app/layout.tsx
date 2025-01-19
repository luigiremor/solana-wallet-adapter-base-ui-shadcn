import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solana Wallet Adapter",
  description: "Solana Wallet Adapter UI - Shadcn",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Solana Wallet Adapter",
    description: "Solana Wallet Adapter UI - Shadcn",
    url: "https://solana-wallet-adapter-base-ui-shadcn.vercel.app/",
    siteName: "Solana Wallet Adapter",
    images: [
      {
        url: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
