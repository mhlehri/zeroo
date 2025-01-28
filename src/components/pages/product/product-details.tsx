import React from "react";
import EmblaCarousel from "./EmblaCarousel";

export default function ProductDetails({ product }: { product: TProduct }) {
  const slides = product?.images;
  return (
    <div className="flex my-10">
      <EmblaCarousel slides={slides} />
    </div>
  );
}
