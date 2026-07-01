import { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-line bg-white",
        padded && "p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
