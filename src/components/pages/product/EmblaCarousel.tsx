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
    [emblaMainApi, emblaThumbsApi]
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
    <div className="max-w-96 w-full mx-auto">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y">
          {slides.map((img, index) => (
            <div className="flex-[0_0_100%] min-w-0" key={index}>
              <Card className="w-full aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={img}
                  className="w-full h-full object-cover"
                  alt="Product Image"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex space-x-2">
          {slides.map((img, index) => (
            <Thumb
              key={index}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              img={img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
