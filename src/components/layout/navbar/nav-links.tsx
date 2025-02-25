"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightSideSticky from "./right-side-sticky";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type TLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  subCategory?: { href: string; label: string }[];
};

interface NavLinksProps {
  links: TLink[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      <NavigationMenu className="container py-3 font-medium text-black xl:px-0">
        <NavigationMenuList className="flex items-center justify-center gap-6 lg:gap-10">
          {links?.map((link, index) =>
            link.subCategory ? (
              <NavigationMenuItem key={`nav-item-${index}`}>
                <NavigationMenuTrigger className="px-0 text-sm uppercase hover:underline hover:opacity-70">
                  {link.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {link.subCategory.map((sub, subIndex) => (
                      <li key={`sub-nav-${subIndex}`}>
                        <NavigationMenuLink
                          className={`hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none ${
                            pathname === sub.href ? "font-semibold" : ""
                          }`}
                        >
                          <Link href={sub.href}>{sub.label}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={`nav-item-${index}`}>
                <NavigationMenuLink
                  asChild
                  className={`text-sm whitespace-nowrap uppercase hover:underline hover:opacity-70 ${
                    pathname === link.href ? "font-semibold" : ""
                  }`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="fixed top-2 right-2">
        <RightSideSticky />
      </div>
    </>
  );
}
