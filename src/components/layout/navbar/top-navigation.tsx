"use client";
import React from "react";
import MobileNav from "./mobile-nav";
import RightSide from "./right-side";
import { Category } from "./mobile-menu";
import { usePage } from "@/hooks/use-page";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TopNavigation({ links }: { links: Category[] }) {
  const { isProductPage } = usePage();
  const mobile = useIsMobile();
  return (
    <div
      className={`sticky top-0 z-50 bg-white/70 backdrop-blur-3xl ${isProductPage && !mobile ? "" : "md:relative"} md:shadow-md`}
    >
      <div className="container flex items-center justify-between gap-4 py-3 md:gap-6 xl:px-0">
        <MobileNav categories={links} />
        <RightSide />
      </div>
    </div>
  );
}
