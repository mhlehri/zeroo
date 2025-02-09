"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
  className?: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "x",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;

    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);

    return () => {
      emblaMainApi.off("select", onSelect);
      emblaMainApi.off("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  return (
    <div className="relative mx-auto w-full lg:max-w-lg">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y">
          {slides?.map((img, index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={index}>
              <Card className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-none md:rounded-md">
                <Image
                  width={400}
                  height={400}
                  src={img || "/placeholder.svg"}
                  className="h-full w-full object-cover"
                  alt="Product Image"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails for larger screens */}
      <div
        className="mt-4 hidden overflow-hidden sm:block"
        ref={emblaThumbsRef}
      >
        <div className="flex space-x-2">
          {slides?.map((img, index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              img={img}
            />
          ))}
        </div>
      </div>

      {/* Dots for mobile devices */}
      {slides.length > 1 && (
        <div className="bg-primary-50 mt-1 flex justify-center space-x-2 rounded-full p-1 sm:hidden">
          {slides?.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                index === selectedIndex ? "bg-primary" : "bg-primary-300"
              }`}
              onClick={() => onThumbClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
