import { ReactNode } from "react";

export function GuideH2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-2xl text-ink pt-2 scroll-mt-24">
      {children}
    </h2>
  );
}

export function GuideP({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-ink-2">{children}</p>;
}

export function GuideList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-2">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function GuideCallout({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: ReactNode;
  tone?: "info" | "warning";
}) {
  return (
    <div
      className={`rounded-xl border px-5 py-4 ${
        tone === "warning"
          ? "border-gold/40 bg-gold-dim"
          : "border-cobalt/25 bg-cobalt-dim"
      }`}
    >
      <p className={`text-sm font-semibold ${tone === "warning" ? "text-gold" : "text-cobalt"}`}>
        {title}
      </p>
      <div className="mt-1.5 text-sm leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}

export function GuideTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-paper-dim">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {row.map((cell, j) => (
                <td key={j} className="font-mono-figure px-4 py-2.5 text-ink-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuideWorkedExample({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line-strong bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate">
        Worked example
      </p>
      <p className="mt-1 font-display text-lg text-ink">{title}</p>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}
