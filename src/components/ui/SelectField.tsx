"use client";

interface Option {
  value: string;
  label: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  id,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  id: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line-strong bg-white py-2.5 pl-3.5 pr-3.5 text-sm text-ink outline-none transition-colors focus:border-cobalt"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-xs text-slate">{hint}</p>}
    </div>
  );
}
