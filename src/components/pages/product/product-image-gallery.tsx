"use client";
import { useState } from "react";
import type React from "react";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZooming) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
    setZoomLevel(2);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomLevel(1);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="group relative h-full w-full cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="h-full w-full transition-transform duration-200 ease-out"
                style={{
                  transform: isZooming ? `scale(${zoomLevel})` : "scale(1)",
                  transformOrigin: isZooming
                    ? `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`
                    : "center center",
                }}
              >
                <Image
                  src={images[currentImage] || "/placeholder.svg"}
                  alt={`${productName} - Image ${currentImage + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-full bg-white/80 p-2">
                  <ZoomIn className="h-6 w-6 text-slate-700" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="relative aspect-square">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={`${productName} - Image ${currentImage + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 opacity-70 shadow-sm transition-opacity hover:opacity-100"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 opacity-70 shadow-sm transition-opacity hover:opacity-100"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative aspect-square h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                currentImage === index ? "" : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
