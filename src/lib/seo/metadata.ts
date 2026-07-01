import type { Metadata } from "next";
import { SITE } from "@/lib/content/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Path starting with a slash, e.g. "/calculators/paye" */
  path: string;
  /** Set false to exclude from indexing (rarely needed) */
  index?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  index = true,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
