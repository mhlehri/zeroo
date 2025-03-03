"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
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
    <div className="relative container">
      <div className="mx-auto flex gap-2">
        {/* Thumbnails for extra larger screens */}
        <div
          className="hidden min-w-20 overflow-hidden xl:block"
          ref={emblaThumbsRef}
        >
          <div className="flex flex-col gap-2">
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
        <div className="overflow-hidden" ref={emblaMainRef}>
          <div className="flex max-w-2xl touch-pan-y">
            {slides?.map((img, index) => (
              <div className="min-w-0 flex-[0_0_100%]" key={index}>
                <div className="roundeddd-md flex aspect-square w-full items-center justify-center overflow-hidden">
                  <Image
                    width={400}
                    height={400}
                    src={img || "/placeholder.svg"}
                    className="h-full w-full bg-gray-200 object-cover"
                    alt="Product Image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails for larger screens */}
      <div
        className="mt-3 hidden overflow-hidden sm:block xl:hidden"
        ref={emblaThumbsRef}
      >
        <div className="flex space-x-2 xl:flex-col">
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
        <div className="roundeddd-full mt-1 flex justify-center space-x-2 p-1 sm:hidden">
          {slides?.map((_, index) => (
            <button
              key={index}
              className={`roundeddd-full h-2 w-2 transition-colors duration-300 ${
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
