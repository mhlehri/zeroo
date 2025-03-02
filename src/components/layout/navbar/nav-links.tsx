"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightSideSticky from "./right-side-sticky";
import { usePage } from "@/hooks/use-page";

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
  const { isProductPage } = usePage();
  if (isProductPage) return null;

  return (
    <>
      <nav className="container py-0 font-medium text-black uppercase xl:px-0">
        <ul className="flex items-center justify-center *:h-full *:px-4 *:hover:cursor-pointer *:hover:bg-black/10 *:lg:px-7 xl:px-0 *:xl:px-8">
          {links?.map((link, index) =>
            link.subCategory ? (
              <li key={`nav-item-${index}`} className="group relative">
                {!isProductPage ? (
                  <Link href={link.href} className="inline-block h-full py-3">
                    {link.label}
                  </Link>
                ) : (
                  <div className="text-md cursor-pointer p-0 py-3">
                    {link.label}{" "}
                  </div>
                )}
                <ul className="invisible absolute top-full left-0 z-50 min-w-[200px] bg-white/95 opacity-0 shadow-lg backdrop-blur-3xl transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100">
                  {link.subCategory.map((sub, subIndex) => (
                    <li key={`sub-nav-${subIndex}`}>
                      <Link
                        href={sub.href}
                        className={`hover:bg-accent hover:text-accent-foreground text-md block w-full px-4 py-2 transition-colors hover:bg-black/10 ${
                          pathname === sub.href ? "font-semibold" : ""
                        }`}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={`nav-item-${index}`}>
                <Link
                  href={link.href}
                  className={`text-md block h-full py-3 whitespace-nowrap ${
                    pathname === link.href ? "font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="fixed top-3 right-2">
        <RightSideSticky />
      </div>
    </>
  );
}
