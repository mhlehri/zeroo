"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RightSideSticky from "./right-side-sticky";

type TLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

interface NavLinksProps {
  links: TLink[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      <ul className="container flex items-center justify-center gap-6 py-3 font-medium text-black lg:gap-10 xl:px-0">
        {links?.map((link, index) => (
          <li
            key={`nav-item-${index}`}
            className={`text-center text-sm whitespace-nowrap uppercase hover:underline hover:opacity-70 ${
              pathname === link.href ? "font-semibold" : ""
            }`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="fixed top-2 right-2">
        <RightSideSticky />
      </div>
    </>
  );
}
