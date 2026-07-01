/**
 * A single inline sponsored-partner strip — e.g. "Compare mortgage rates
 * with [Partner]". Visually subtle: one thin bordered strip, no imagery,
 * no motion. Renders nothing when no partner is configured.
 */
export function SponsoredPartner({
  label,
  href,
}: {
  label?: string;
  href?: string;
}) {
  if (!label || !href) return null;

  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-sm transition-colors hover:border-cobalt"
    >
      <span className="text-ink">{label}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate/60">
        Sponsored
      </span>
    </a>
  );
}
