import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const usePage = () => {
  const pathname = usePathname();
  const [isDetailsPage, setIsDetailsPage] = useState(false);
  const [isProductPage, setIsProductPage] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);
  // const [isHomePage, setHomePage] = useState(false);

  useEffect(() => {
    setIsProductPage(pathname === "/products");
    setIsDetailsPage(
      pathname.startsWith("/products/") && pathname.split("/").length === 3,
    );
    setIsCartPage(pathname === "/cart");
  }, [pathname]);
  return { isDetailsPage, isProductPage, isCartPage };
};
