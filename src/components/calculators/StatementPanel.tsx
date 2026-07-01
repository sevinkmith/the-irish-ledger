import { ReactNode } from "react";
import clsx from "clsx";
import { formatEUR } from "@/lib/utils/format";

/**
 * StatementPanel renders calculator results like a printed bank statement:
 * a big headline figure, hairline-ruled line items, and a mono typeface for
 * every number. This is the site's signature UI element — used instead of
 * a generic "results card" so figures feel precise and legible at a glance.
 */
export function StatementPanel({
  title,
  headlineLabel,
  headlineValue,
  headlineTone = "ink",
  children,
  footnote,
}: {
  title: string;
  headlineLabel: string;
  headlineValue: string;
  headlineTone?: "ink" | "gold";
  children: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-white shadow-[0_1px_0_0_rgba(14,42,71,0.04)]">
      <div className="border-b border-dashed border-line-strong bg-paper-dim px-6 py-4 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
          {title}
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-slate">
          {headlineLabel}
        </p>
        <p
          className={clsx(
            "font-mono-figure mt-1 text-4xl font-semibold sm:text-5xl",
            headlineTone === "gold" ? "text-gold" : "text-ink"
          )}
        >
          {headlineValue}
        </p>
      </div>

      <div className="px-6 pb-6 sm:px-8">{children}</div>

      {footnote && (
        <div className="rule-hairline px-6 py-4 text-xs leading-relaxed text-slate sm:px-8">
          {footnote}
        </div>
      )}
    </div>
  );
}

export function LedgerRow({
  label,
  value,
  isTotal = false,
  isDeduction = false,
}: {
  label: string;
  value: number;
  isTotal?: boolean;
  isDeduction?: boolean;
}) {
  return (
    <div
      className={clsx(
        "ledger-row flex items-baseline justify-between gap-4 py-2.5",
        isTotal && "rule-hairline mt-1 pt-3 font-semibold"
      )}
    >
      <span className={clsx("text-sm", isTotal ? "text-ink" : "text-slate")}>
        {label}
      </span>
      <span
        className={clsx(
          "font-mono-figure whitespace-nowrap text-sm",
          isTotal ? "text-ink text-base" : isDeduction ? "text-danger" : "text-ink"
        )}
      >
        {isDeduction && value > 0 ? "−" : ""}
        {formatEUR(Math.abs(value))}
      </span>
    </div>
  );
}
