"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { usePage } from "@/hooks/use-page";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileMenu from "./mobile-menu";

export default function MobileNav({
  categories,
}: {
  categories: { label: string; href: string }[];
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isProductPage, isCartPage, isDetailsPage } = usePage();

  if (!isMobile)
    return (
      <Link
        href="/"
        className="flex items-center gap-2 pl-2 text-2xl font-bold"
      >
        <span className="text-teal-700">
          Rong<span className="text-rose-400">berong</span>
        </span>
      </Link>
    );

  if (isProductPage || isCartPage || isDetailsPage) {
    return (
      <ArrowLeft
        className="w-fit text-slate-700"
        onClick={() => router.back()}
      />
    );
  } else {
    return (
      <>
        <MobileMenu categories={categories} textHidden className="w-full" />
        <Link href="/" className="w-full text-center text-xl font-bold">
          <span className="text-teal-700">
            Rong<span className="text-rose-400">berong</span>
          </span>
        </Link>
      </>
    );
  }

  return null;
}
