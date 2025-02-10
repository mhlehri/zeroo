"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./product-card";
import Autoplay from "embla-carousel-autoplay";

export default function CardCarousel({ cardArr }: { cardArr: TProduct[] }) {
  return (
    <Carousel
      className="group z-40 w-full"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      opts={{
        slidesToScroll: 2,
        duration: 25,
        dragFree: true,
      }}
    >
      <CarouselContent className="-ml-2 select-none sm:-ml-3 md:-ml-4">
        {cardArr.length ? (
          cardArr.map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 pl-2 sm:basis-auto sm:pl-3 md:pl-4"
            >
              <div className="p-1">
                <ProductCard product={_} />
              </div>
            </CarouselItem>
          ))
        ) : (
          <div className="loader" />
        )}
      </CarouselContent>
      <div>
        <CarouselPrevious className="text-primary left-0 border-none p-0 2xl:-left-10" />
        <CarouselNext className="text-primary right-0 border-none p-0 2xl:-right-10" />
      </div>
    </Carousel>
  );
}
