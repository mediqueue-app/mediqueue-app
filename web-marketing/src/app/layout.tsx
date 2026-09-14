import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { content } from "@/content";
import { COMPANY_INSTAGRAM, COMPANY_LINKEDIN, SITE_URL } from "@/lib/site";
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
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
        url: SITE_URL,
        logo: `${SITE_URL}/mediqueue-logo.png`,
        description: seo.description,
        sameAs: [COMPANY_INSTAGRAM, COMPANY_LINKEDIN],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "MEDIQUEUE",
        description: seo.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["tr-TR", "en-US"],
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <SiteChrome initialLocale={locale}>{children}</SiteChrome>
      </body>
    </html>
  );
}
