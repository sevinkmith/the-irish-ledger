export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Renders both the visible FAQ accordion and its FAQPage JSON-LD structured
 * data, so the two never drift out of sync.
 */
export function FaqSchema({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white">
        {items.map((item) => (
          <details key={item.question} className="group px-6 py-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:content-none">
              <span className="inline-flex w-full items-center justify-between gap-4">
                {item.question}
                <span className="shrink-0 text-cobalt transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
