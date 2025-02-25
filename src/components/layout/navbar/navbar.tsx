import Link from "next/link";
import { getCategories } from "@/services/category";
import RightSide from "./right-side";
import MobileNav from "./mobile-nav";
import NavLinks from "./nav-links";

type TCategory = {
  id: string;
  name: string;
  slug: string;
};

export default async function Navbar() {
  const { categories } = await getCategories();

  const initialLinks = [
    {
      href: "/products",
      label: "Shop",
    },
    {
      href: "/products?sort=new",
      label: "New Arrivals",
    },
  ];

  const categoryLinks =
    categories?.map((category: TCategory) => ({
      href: `/products?category=${category.name}`,
      label: category.name,
    })) || [];

  const links = [...initialLinks, ...categoryLinks];

  return (
    <>
      <div className="bg-primary sticky top-0 z-50 md:relative">
        <div className="container flex items-center justify-between gap-4 py-2 md:gap-6 md:py-4 xl:px-0">
          <MobileNav />
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 text-2xl font-bold text-black md:text-2xl"
          >
            <span className="text-teal-700">
              Rong<span className="text-rose-400">berong</span>
            </span>
          </Link>
          <RightSide />
        </div>
      </div>

      <div className="bg-primary-400 sticky top-0 z-50 flex items-center">
        <NavLinks links={links} />
      </div>
    </>
  );
}
