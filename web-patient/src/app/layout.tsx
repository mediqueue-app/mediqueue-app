import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoLauncher } from "@/components/common/DemoLauncher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediQueue | Kliniğinizi ve Doktorunuzu Bulun",
  description:
    "MediQueue — semptomunuza, şehrinize ve tarihinize göre en iyi klinikleri ve doktorları keşfedin, şeffaf fiyatlarla anında randevu alın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Geliştirme-içi demo başlatıcı (prodüksiyonda render edilmez). */}
        <DemoLauncher />
      </body>
    </html>
  );
}
