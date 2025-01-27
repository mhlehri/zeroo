"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/products" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT US", href: "/contact" },
];

export default function MobileMenu({
  textHidden,
  className,
  categories,
}: {
  textHidden?: boolean;
  className?: string;
  categories: { name: string; href?: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={className}>
        <>
          <Menu size={24} className="text-primary" />
          <span className="text-xs text-gray-500 truncate" hidden={textHidden}>
            Menu
          </span>
        </>
      </DrawerTrigger>
      <DrawerContent className="">
        <Tabs defaultValue="menu" className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle hidden>Menu</DrawerTitle>
            <TabsList className="w-full rounded-lg h-12 grid grid-cols-2">
              <TabsTrigger
                value="menu"
                className="rounded data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                MENU
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="rounded data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                CATEGORIES
              </TabsTrigger>
            </TabsList>
          </DrawerHeader>
          <TabsContent value="menu" className="mt-0">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </TabsContent>
          <TabsContent value="categories" className="mt-0">
            <nav className="space-y-2">
              {categories?.length &&
                categories?.map((category) => (
                  <Link
                    key={category?.name}
                    href={category?.name
                      .replace(/\s+/g, "-")
                      .toLocaleLowerCase()}
                    className="block px-4 py-2 hover:bg-muted transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {category?.name}
                  </Link>
                ))}
            </nav>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
