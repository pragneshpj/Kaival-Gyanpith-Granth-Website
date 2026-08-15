import { Flourish } from "./Icons";
import type { ReactNode } from "react";

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="relative mb-10 flex items-center justify-center">
      <div className="flex max-w-full items-center gap-3 px-2">
        <Flourish className="hidden h-4 w-24 sm:block" />
        <h2 className="text-center text-2xl font-bold text-ink md:text-3xl">{title}</h2>
        <Flourish className="hidden h-4 w-24 sm:block" />
      </div>
      {action ? (
        <div className="absolute right-0 hidden md:block">{action}</div>
      ) : null}
    </div>
  );
}
