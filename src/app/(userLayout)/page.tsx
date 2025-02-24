import BestSellingProducts from "@/components/pages/home/best-selling";
import Categories from "@/components/pages/home/categories";
import FeaturedProducts from "@/components/pages/home/featured-product";
import NewArrivalProducts from "@/components/pages/home/new-arrival";
import CardCarouselSkeleton from "@/components/skeleton/card-carousel-skeleton";
import Title from "@/components/title";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";
import banner from "../../../public/banner.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Image
        src={banner}
        alt=""
        className="max-h-[500px] w-full bg-cover bg-fixed"
      />
      <div className="container my-8 space-y-6 px-2 md:my-12 md:space-y-10 lg:space-y-12">
        <section>
          <Suspense
            fallback={
              <div className="flex gap-4 overflow-hidden *:size-16 *:min-w-16 *:flex-1 *:rounded-full *:bg-slate-200 *:md:size-[70px] *:lg:size-[140px] *:lg:rounded *:xl:size-[180px] *:2xl:size-[200px]">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            }
          >
            <Categories />
          </Suspense>
        </section>
        <section>
          <Title>Featured Products</Title>
          <Suspense fallback={<CardCarouselSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </section>
        <NewArrivalProducts />
        <BestSellingProducts />
      </div>
    </div>
  );
}
