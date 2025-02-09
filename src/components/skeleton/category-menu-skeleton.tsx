import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CategoryMenuSkeleton() {
  return (
    <Skeleton className="w-full max-w-40 h-8 flex items-center gap-2 bg-slate-50">
      <Skeleton className="size-8 bg-slate-300" />
      <Skeleton className="h-2 w-16 bg-slate-300" />
    </Skeleton>
  );
}
