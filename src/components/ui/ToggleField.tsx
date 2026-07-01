"use client";

export function ToggleField({
  label,
  checked,
  onChange,
  id,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  id: string;
  hint?: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-line-strong bg-white px-4 py-3"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[var(--cobalt)]"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-slate">{hint}</span>}
      </span>
    </label>
  );
}
