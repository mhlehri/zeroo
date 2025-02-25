"use client";

// import CategoryMenuSkeleton from "@/components/skeleton/category-menu-skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({
  textHidden,
  className,
  categories,
}: {
  textHidden?: boolean;
  className?: string;
  categories: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={className}>
        <>
          <Menu className="size-5 text-black" />
          <span
            className="text-primary-500 truncate text-xs"
            hidden={textHidden}
          >
            Menu
          </span>
        </>
      </SheetTrigger>
      <SheetContent className="" side="left">
        <SheetHeader>
          <SheetTitle hidden>Menu</SheetTitle>
        </SheetHeader>
        <nav className="max-h-[50vh] space-y-2 overflow-y-auto">
          {/* {isLoading ? (
                <>
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                </>
              ) : ( */}
          {categories?.length > 0 &&
            categories?.map((category) => (
              <Link
                key={category?.label}
                href={category?.href}
                className="hover:bg-muted flex items-center gap-2 px-4 py-2 text-black transition-colors"
                onClick={() => setOpen(false)}
              >
                {/* {category.image && (
                      <Image
                        src={category.image}
                        width={30}
                        height={30}
                        alt=""
                        className="size-8 rounded"
                      />
                    )}{" "} */}
                {category?.label}
              </Link>
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
