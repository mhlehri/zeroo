"use client";

import type React from "react";

import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  image?: string;
  title?: string;
}

export const ListItem = forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, image, title, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={`/products?category=${encodeURIComponent(title as string)}`}
            ref={ref}
            className={cn(
              "hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-1.5 leading-none no-underline outline-hidden transition-colors select-none",
              className,
            )}
            {...props}
          >
            <div className="flex items-center gap-2 text-sm leading-none font-medium">
              {image && (
                <Image
                  src={image || "/placeholder.svg"}
                  width={30}
                  height={30}
                  alt=""
                  className="size-8 rounded"
                />
              )}
              {title}
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
