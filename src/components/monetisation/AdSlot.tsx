/**
 * Placeholder ad slot. Swap the inner content for a real Google AdSense
 * <ins> unit (or any other network's tag) when monetisation is switched on —
 * the surrounding container, spacing and "Advertisement" label should stay
 * so layout doesn't shift. Kept visually quiet by design: no popups, no
 * layout-shifting formats, one slot per page section maximum.
 */
export function AdSlot({
  variant = "leaderboard",
  className,
}: {
  variant?: "leaderboard" | "rectangle" | "in-content";
  className?: string;
}) {
  const heights: Record<string, string> = {
    leaderboard: "h-[90px]",
    rectangle: "h-[250px]",
    "in-content": "h-[100px]",
  };

  return (
    <div className={className}>
      <p className="mb-1.5 text-center text-[10px] uppercase tracking-widest text-slate/70">
        Advertisement
      </p>
      <div
        className={`flex ${heights[variant]} w-full items-center justify-center rounded-lg border border-dashed border-line-strong bg-paper-dim/50 text-xs text-slate/60`}
      >
        Ad slot — {variant}
      </div>
    </div>
  );
}
