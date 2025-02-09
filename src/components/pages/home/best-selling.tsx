"use client";

import CardCarousel from "@/components/card/card-carousel";
import CardCarouselSkeleton from "@/components/skeleton/card-carousel-skeleton";
import Title from "@/components/title";
import { useGetProducts } from "@/hooks/use-product";

export default function BestSellingProducts() {
  const { products, isLoading } = useGetProducts({
    limit: 8,
    sortOrder: "asc",
  });
  if (isLoading) return <CardCarouselSkeleton />;
  return (
    <section>
      <Title className="mb-6">Best Selling Products</Title>
      <CardCarousel cardArr={products}></CardCarousel>
    </section>
  );
}
