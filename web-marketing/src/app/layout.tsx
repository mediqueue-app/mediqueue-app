import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { content } from "@/content";
import { SITE_URL } from "@/lib/site";
import { getRequestLocale } from "@/lib/locale-server";
import { localizedMetadata } from "@/lib/seo";
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
  const localeMeta = await localizedMetadata("home");
  const locale = await getRequestLocale();
  const seo = content[locale].seo;

  return {
    metadataBase: new URL(SITE_URL),
    ...localeMeta,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: "MEDIQUEUE",
      ...localeMeta.openGraph,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const seo = content[locale].seo;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MEDIQUEUE",
    url: SITE_URL,
    description: seo.description,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <SiteChrome initialLocale={locale}>{children}</SiteChrome>
      </body>
    </html>
  );
}
