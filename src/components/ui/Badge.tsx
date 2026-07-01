import { ReactNode } from "react";
import clsx from "clsx";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "gold" | "cobalt";
  className?: string;
}) {
  const toneClasses = {
    neutral: "bg-paper-dim text-slate",
    gold: "bg-gold-dim text-gold",
    cobalt: "bg-cobalt-dim text-cobalt",
  }[tone];

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
