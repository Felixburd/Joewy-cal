import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Space_Grotesk } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: "Joewy Events",
  description: "Event management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
