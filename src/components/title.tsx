import { cn } from "@/lib/utils";
import React from "react";

export default function Title({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "text-primary-950 mb-3 text-lg font-semibold text-balance sm:mb-4 sm:text-xl md:mb-6 md:text-2xl lg:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
