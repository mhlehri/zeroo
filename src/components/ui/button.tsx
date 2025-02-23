import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-hidden  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#FFBF00] text-black hover:bg-yellow-500/90",
        destructive: "bg-red-500 text-primary-50 hover:bg-red-500/90",
        outline: "border hover:bg-primary-100 text-primary-800",
        secondary: "bg-primary-100 text-primary-900 hover:bg-primary-100/80",
        ghost: "hover:bg-primary-100 hover:text-primary-900",
        link: "text-primary-800 underline-offset-4 hover:underline",
        light:
          "border border-primary-200 bg-primary-50 hover:bg-primary-100 text-primary-800 rounded",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 px-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
