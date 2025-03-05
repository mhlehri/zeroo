"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./product-card";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { useEffect, useRef } from "react";

export default function CardCarousel({ cardArr }: { cardArr: TProduct[] }) {
  const autoplayRef = useRef<AutoplayType | null>(null);

  useEffect(() => {
    // Reset autoplay when component mounts or cardArr changes
    if (autoplayRef.current) {
      autoplayRef.current.reset();
    }
  }, []);

  if (!cardArr?.length) return null;

  const plugin = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  // Store the plugin reference
  if (plugin && typeof plugin === "object" && "reset" in plugin) {
    autoplayRef.current = plugin as AutoplayType;
  }

  return (
    <Carousel
      className="group z-40 w-full"
      plugins={[plugin]}
      opts={{
        slidesToScroll: 1,
        align: "start",
        loop: cardArr.length > 4,
        dragFree: true,
      }}
    >
      <CarouselContent className="-ml-2 select-none sm:-ml-3 md:-ml-4">
        {cardArr?.map((product, index) => (
          <CarouselItem
            key={product._id || index}
            className="basis-auto pl-2 sm:pl-3"
          >
            <div className="p-1">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-end gap-2">
        <CarouselPrevious className="relative left-0 rounded border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white" />
        <CarouselNext className="relative right-0 rounded border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white" />
      </div>
    </Carousel>
  );
}
