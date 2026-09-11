import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { content } from "@/content";
import { SITE_URL } from "@/lib/site";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const display = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const seo = content.en.seo;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.title,
    template: "%s · MEDIQUEUE",
  },
  description: seo.description,
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      tr: "/tr",
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["tr_TR"],
    url: SITE_URL,
    siteName: "MEDIQUEUE",
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MEDIQUEUE",
    url: SITE_URL,
    description: seo.description,
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${display.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="tr" href={`${SITE_URL}/tr`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
