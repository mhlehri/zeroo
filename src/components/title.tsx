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
      className={cn("text-2xl md:text-3xl font-bold text-balance", className)}
    >
      {children}
    </h2>
  );
}
