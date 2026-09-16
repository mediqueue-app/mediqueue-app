import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediQueue Admin | Marketplace Kontrol Merkezi",
  description:
    "MediQueue Süperadmin Paneli — klinik başvurularını onaylayın, hastaları ve klinikleri yönetin, platform gelirini ve kalite standartlarını izleyin.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
