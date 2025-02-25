"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isDetailsPage, setIsDetailsPage] = useState(false);
  const [isProductPage, setIsProductPage] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);

  useEffect(() => {
    setIsProductPage(pathname === "/products");
    setIsDetailsPage(
      pathname.startsWith("/products/") && pathname.split("/").length === 3,
    );
    setIsCartPage(pathname === "/cart");
  }, [pathname]);

  if (!isMobile) return null;

  if (isProductPage || isCartPage || isDetailsPage) {
    return (
      <ArrowLeft className="text-slate-700" onClick={() => router.back()} />
    );
  }

  return null;
}
