"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { useState } from "react";
import EmblaCarousel from "./EmblaCarousel";

export default function ProductDetails({ product }: { product: TProduct }) {
  const slides = product?.images;
  const { name, price, description, stock } = product || {};
  const rating = 4;
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () =>
    setQuantity((prev) => Math.min(stock, prev + 1));
  return (
    <div className="flex flex-col md:flex-row my-4 sm:my-6 md:my-10 gap-4 md:gap-10 justify-center">
      <div className="md:w-1/2">
        <EmblaCarousel slides={slides} />
      </div>
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600">({rating} out of 5 stars)</span>
        </div>
        <p className="text-2xl text-gray-900">
          ৳<span className="font-bold">{price.toFixed(2)}</span>
        </p>
        <p className="text-gray-700">{description}</p>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <button
              onClick={decreaseQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-1 text-gray-800">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center text-green-600">
          <Truck className="w-5 h-5 mr-2" />
          <span>Free shipping - Estimated delivery in 3-5 days</span>
        </div>

        <p className={`${stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {stock > 0 ? `In stock (${stock} available)` : "Out of stock"}
        </p>

        <div className="flex space-x-4">
          <Button className="flex-1 flex gap-2" disabled={stock === 0}>
            <ShoppingCart /> Add to Cart
          </Button>
          <Button className="flex-1" variant="outline" disabled={stock === 0}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
