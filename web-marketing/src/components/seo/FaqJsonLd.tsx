import { content } from "@/content";
import { getRequestLocale } from "@/lib/locale-server";

export async function FaqJsonLd() {
  const locale = await getRequestLocale();
  const items = content[locale].how.faqItems;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
