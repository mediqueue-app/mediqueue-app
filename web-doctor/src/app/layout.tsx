import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediQueue Doctor | Doktor Portalı",
  description:
    "MediQueue Doktor Portalı — hastalarınızı yönetin, takviminizi planlayın, tedavi süreçlerini takip edin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${jakarta.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
