import { getCategories } from "@/services/category";
import NavLinks from "./nav-links";
import BottomNavigation from "./bottom-navigation";
import TopNavigation from "./top-navigation";
import { Category } from "./mobile-menu";

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

  const links: Category[] = [...initialLinks, ...categoryLinks];

  return (
    <>
      <TopNavigation {...links} />
      <BottomNavigation />

      <div className="sticky top-0 z-50 hidden items-center bg-white/70 shadow backdrop-blur-3xl md:flex">
        <NavLinks links={links} />
      </div>
    </>
  );
}
