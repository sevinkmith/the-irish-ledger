"use client";

import { InputHTMLAttributes } from "react";

interface NumberFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  id: string;
}

/**
 * A labelled numeric input used across every calculator. Keeps focus rings,
 * spacing and the euro-prefix/percent-suffix treatment consistent.
 */
export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  id,
  ...rest
}: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
          className={`font-mono-figure w-full rounded-lg border border-line-strong bg-white py-2.5 text-sm text-ink outline-none transition-colors focus:border-cobalt ${
            prefix ? "pl-8" : "pl-3.5"
          } ${suffix ? "pr-10" : "pr-3.5"}`}
          {...rest}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-slate">{hint}</p>}
    </div>
  );
}
