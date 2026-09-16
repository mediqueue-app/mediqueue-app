import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { KeyboardInsets } from "@/components/mobile/KeyboardInsets";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediQueue Clinic | Klinik Yönetim Paneli",
  description:
    "MediQueue B2B Klinik Yönetim Paneli — hasta taleplerini yönetin, doktor kadronuzu planlayın, performansınızı izleyin.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#3a6ad6",
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <I18nProvider>
        <KeyboardInsets />
        {children}
        </I18nProvider>
      </body>
    </html>
  );
}
