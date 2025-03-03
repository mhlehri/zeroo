import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "roundeddd-md animate-pulse bg-gray-200 dark:bg-gray-800",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
