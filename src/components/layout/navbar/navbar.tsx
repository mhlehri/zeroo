import { getCategories } from "@/services/category";
import RightSide from "./right-side";
import MobileNav from "./mobile-nav";
import NavLinks from "./nav-links";
import BottomNavigation from "./bottom-navigation";

export default async function Navbar() {
  const { categories } = await getCategories();

  const initialLinks = [
    {
      href: "/",
      label: "Home",
    },
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
      subCategory: category.subCategories.map((subCategory) => ({
        href: `/products?category=${category.name}&subCategory=${subCategory.name}`,
        label: subCategory.name,
      })),
    })) || [];

  const links = [...initialLinks, ...categoryLinks];

  return (
    <>
      <div className="bg-primary sticky top-0 z-50 md:relative">
        <div className="container flex items-center justify-between gap-4 py-3 md:gap-6 md:py-4 xl:px-0">
          <MobileNav categories={links} />
          <RightSide />
        </div>
      </div>
      <BottomNavigation />

      <div className="bg-primary-400 sticky top-0 z-50 hidden items-center md:flex">
        <NavLinks links={links} />
      </div>
    </>
  );
}
