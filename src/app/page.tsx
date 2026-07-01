import { Hero } from "@/components/home/Hero";
import { FeaturedCalculators } from "@/components/home/FeaturedCalculators";
import { RecentGuides } from "@/components/home/RecentGuides";
import { WhyTrustUs } from "@/components/home/WhyTrustUs";
import { HomeDisclaimer } from "@/components/home/HomeDisclaimer";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/content/site";

export const metadata = buildMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCalculators />
      <RecentGuides />
      <WhyTrustUs />
      <HomeDisclaimer />
    </>
  );
}
