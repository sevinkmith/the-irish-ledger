"use client";

export function DateField({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono-figure w-full rounded-lg border border-line-strong bg-white py-2.5 px-3.5 text-sm text-ink outline-none transition-colors focus:border-cobalt"
      />
    </div>
  );
}
