import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-amber-950 placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-amber-800 dark:bg-amber-950  dark:file:text-amber-50 dark:placeholder:text-amber-400 dark:focus-visible:ring-amber-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
