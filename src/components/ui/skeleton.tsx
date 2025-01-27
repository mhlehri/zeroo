import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-amber-100 dark:bg-amber-800",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
