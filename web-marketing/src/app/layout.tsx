import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { content } from "@/content";
import {
  COMPANY_EMAIL,
  COMPANY_INSTAGRAM,
  COMPANY_LINKEDIN,
  SITE_URL,
} from "@/lib/site";
import { getRequestLocale } from "@/lib/locale-server";
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#3a6ad6",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "MEDIQUEUE",
    authors: [{ name: "MEDIQUEUE", url: SITE_URL }],
    creator: "MEDIQUEUE",
    publisher: "MEDIQUEUE",
    icons: {
      icon: "/mediqueue-icon.png",
      apple: "/mediqueue-icon.png",
      shortcut: "/mediqueue-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const seo = content[locale].seo;
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "MEDIQUEUE",
        alternateName: ["MediQueue", "MEDI·QUEUE", "Medi Queue"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/mediqueue-logo.png`,
        },
        email: COMPANY_EMAIL,
        description: seo.description,
        sameAs: [COMPANY_INSTAGRAM, COMPANY_LINKEDIN],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "MEDIQUEUE",
        alternateName: ["MediQueue"],
        inLanguage: "tr-TR",
        description: content.tr.seo.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/en#website`,
        url: `${SITE_URL}/en`,
        name: "MEDIQUEUE",
        inLanguage: "en-US",
        description: content.en.seo.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${jakarta.variable} ${display.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <SiteChrome initialLocale={locale}>{children}</SiteChrome>
      </body>
    </html>
  );
}
