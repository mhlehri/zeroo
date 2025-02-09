import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "border-primary-200 placeholder:text-primary-500 dark:border-primary-800 dark:bg-primary-950 dark:ring-offset-primary-950 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-300 flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base ring-offset-white focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
