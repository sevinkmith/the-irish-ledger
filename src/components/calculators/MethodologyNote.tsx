import { ReactNode } from "react";

export function MethodologyNote({
  title = "How this is calculated",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-2xl border border-line bg-paper-dim/60 px-6 py-5 open:pb-6">
      <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:content-none">
        <span className="inline-flex items-center gap-2">
          <span className="text-cobalt transition-transform group-open:rotate-90">
            &rsaquo;
          </span>
          {title}
        </span>
      </summary>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate">
        {children}
      </div>
    </details>
  );
}
