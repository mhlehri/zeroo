import BestSellingProducts from "@/components/pages/home/best-selling";
import Categories from "@/components/pages/home/categories";
import FeaturedProducts from "@/components/pages/home/featured-product";
import NewArrivalProducts from "@/components/pages/home/new-arrival";
import TrendingProducts from "@/components/pages/home/trending";
import Image from "next/image";
import banner from "../../../public/banner.png";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Image src={banner} alt="" className="w-full max-h-[500px] min-h-60" />
      <div className="container my-10 md:my-16 px-2 space-y-10 md:space-y-20">
        <Categories />
        <FeaturedProducts />
        <NewArrivalProducts />
        <BestSellingProducts />
        <TrendingProducts />
      </div>
    </div>
  );
}
