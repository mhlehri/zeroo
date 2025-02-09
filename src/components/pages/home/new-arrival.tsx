"use client";
import Title from "@/components/title";
import CardCarousel from "@/components/card/card-carousel";
import { useGetProducts } from "@/hooks/use-product";
import CardCarouselSkeleton from "@/components/skeleton/card-carousel-skeleton";

export default function NewArrivalProducts() {
  const { products, isLoading } = useGetProducts({
    limit: 6,
    sortOrder: "new",
  });
  if (isLoading) return <CardCarouselSkeleton />;

  return (
    <section>
      <Title className="mb-6">New Arrival</Title>
      <CardCarousel cardArr={products}></CardCarousel>
    </section>
  );
}
