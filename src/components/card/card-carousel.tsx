"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./product-card";

export default function CardCarousel({ cardArr }: { cardArr: unknown[] }) {
  return (
    <Carousel
      className="w-full group z-40"
      opts={{
        slidesToScroll: 2,
        duration: 25,
      }}
    >
      <CarouselContent className="-ml-1 select-none">
        {(cardArr.length ? cardArr : Array.from({ length: 10 })).map(
          (_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1">
                <ProductCard />
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <div className="">
        <CarouselPrevious className="left-0 2xl:-left-10 border-none p-0 text-primary" />
        <CarouselNext className="right-0 2xl:-right-10 border-none p-0 text-primary" />
      </div>
    </Carousel>
  );
}
