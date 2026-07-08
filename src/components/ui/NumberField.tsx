"use client";

import { InputHTMLAttributes, useState } from "react";

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
 *
 * Manages its own local text state rather than mirroring the numeric value
 * directly on every keystroke. A plain `type="number"` input bound straight
 * to a number forces "0" back in when cleared (can't represent "empty") and
 * can accumulate a leading zero while typing (e.g. "050000"), because a
 * leading zero doesn't change the parsed numeric value, so React sometimes
 * skips re-syncing the displayed text. Keeping local text state avoids both.
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
  const [text, setText] = useState(String(value));
  const [lastExternalValue, setLastExternalValue] = useState(value);

  if (value !== lastExternalValue) {
    const parsed = parseFloat(text);
    const currentAsNumber = Number.isFinite(parsed) ? parsed : 0;
    if (value !== currentAsNumber) {
      setText(String(value));
    }
    setLastExternalValue(value);
  }

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
          type="text"
          inputMode="decimal"
          value={text}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw !== "" && !/^\d*\.?\d*$/.test(raw)) return;
            setText(raw);
            const parsed = parseFloat(raw);
            const next = Number.isFinite(parsed) ? parsed : 0;
            setLastExternalValue(next);
            onChange(next);
          }}
          onBlur={() => {
            const parsed = parseFloat(text);
            const clean = Number.isFinite(parsed) ? parsed : 0;
            setText(String(clean));
          }}
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
