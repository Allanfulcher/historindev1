import type { Metadata } from "next";
// Temporarily disabled Google Fonts to fix lightningcss build error
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HashRouter from "../components/HashRouter";

// Temporarily disabled to fix build issues
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Historin - Descubra as Histórias de Gramado",
  description: "Explore as fascinantes histórias das ruas de Gramado através de uma experiência interativa e imersiva.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased min-h-screen bg-[#f4ede0] text-[#6B5B4F]"
      >
        <HashRouter />
        {children}
      </body>
    </html>
  );
}

