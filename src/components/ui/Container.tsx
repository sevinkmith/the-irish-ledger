import { ReactNode } from "react";
import clsx from "clsx";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As className={clsx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </As>
  );
}
