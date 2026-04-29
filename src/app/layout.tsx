import type { Metadata } from "next";
import { Space_Grotesk, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "TheAisle.com - Royal Sponsorship",
  description: "Reject the muted beige. Join the most high-octane, visually explosive Indian wedding celebration of the year.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${beVietnamPro.variable} font-body bg-surface text-on-surface antialiased relative min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
