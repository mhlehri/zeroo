"use client";
import { useEffect, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/cart-provider";
import { useGetProducts } from "@/hooks/use-product";

import AddToCart from "@/components/button/addToCart";
import BuyNow from "@/components/button/buyNow";
import CardCarousel from "@/components/card/card-carousel";
import CardCarouselSkeleton from "@/components/skeleton/card-carousel-skeleton";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductImageGallery from "./product-image-gallery";

// Define the TProduct type
type TProduct = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  stock: number;
  category: string;
  subCategory?: string;
  images: string[];
  tags: string[];
  sku?: string;
  variants?: { size: string; stock: number }[];
};

export default function ProductDetails({ product }: { product: TProduct }) {
  const slides = product?.images;
  const { name, price, description, stock, category, tags } = product || {
    name: "",
    price: 0,
    description: "",
    stock: 0,
    category: "",
    tags: [],
  };

  const { products, isLoading } = useGetProducts({
    query: "",
    category: category || "",
    sortOrder: "",
  });

  const { cart, updateQuantity } = useCart();

  // Quantity state management
  const [quantity, setQuantity] = useState(1);
  const [inStock, setInStock] = useState(stock > 0);

  // Update quantity when cart changes or stock changes
  useEffect(() => {
    const cartItem = cart.find((item) => item.id === product._id);
    const defaultQuantity = cartItem?.quantity || 1;

    // Ensure quantity doesn't exceed current stock
    setQuantity(Math.min(defaultQuantity, stock));
    setInStock(stock > 0);
  }, [cart, product._id, stock]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      // Update cart if item exists in cart
      if (cart.find((item) => item.id === product._id)) {
        updateQuantity(product._id, newQuantity);
      }
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);

      // Update cart if item exists in cart
      if (cart.find((item) => item.id === product._id)) {
        updateQuantity(product._id, newQuantity);
      }
    }
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = Number.parseInt(value);

    if (!isNaN(newQuantity)) {
      // Ensure quantity is between 1 and stock
      const validQuantity = Math.max(1, Math.min(newQuantity, stock));
      setQuantity(validQuantity);

      // Update cart if item exists in cart
      if (cart.find((item) => item.id === product._id)) {
        updateQuantity(product._id, validQuantity);
      }
    }
  };

  return (
    <div className="container mx-auto my-8 px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        {/* Product Images - Left Side (2 columns on large screens) */}
        <div className="lg:col-span-2">
          <ProductImageGallery images={slides} productName={name} />
        </div>

        {/* Product Details - Right Side (3 columns on large screens) */}
        <div className="space-y-6 lg:col-span-3">
          {/* Product Title and Price */}
          <div>
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                {name}
              </h1>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Heart className="h-5 w-5 text-slate-600" />
                        <span className="sr-only">Add to wishlist</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add to wishlist</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Share2 className="h-5 w-5 text-slate-600" />
                        <span className="sr-only">Share product</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share product</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500">(24 reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                TK {price?.toFixed(2)}
              </span>
              {product.discountPrice && (
                <span className="text-lg text-slate-500 line-through">
                  TK {product.discountPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Badge
              variant={inStock ? "outline" : "destructive"}
              className="px-3 py-1 text-sm font-medium"
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Badge>

            {inStock && (
              <span className="text-sm text-slate-600">
                {stock > 10
                  ? "Plenty in stock"
                  : stock > 5
                    ? "Limited stock available"
                    : `Only ${stock} left`}
              </span>
            )}
          </div>

          {/* Product Description */}
          <div className="prose prose-slate max-w-none text-slate-700">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          {/* Product Features */}
          <div className="space-y-3 rounded-lg bg-slate-200 p-4">
            <h3 className="font-medium text-slate-900">Product Highlights</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Truck className="text-primary h-4 w-4" />
                <span>Free shipping on orders over TK 1000</span>
              </li>
              <li className="flex items-center gap-2">
                <ShoppingBag className="text-primary h-4 w-4" />
                <span>30-day money-back guarantee</span>
              </li>
              {tags && tags.length > 0 && (
                <li className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">Tags:</span>
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="capitalize"
                    >
                      {tag}
                    </Badge>
                  ))}
                </li>
              )}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Quantity:
              </label>
              <div className="roundedd-md flex h-10 w-fit items-start overflow-hidden border border-slate-300">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-none border-r px-3"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1 || !inStock}
                >
                  <Minus size={16} />
                  <span className="sr-only">Decrease quantity</span>
                </Button>

                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={stock}
                  value={quantity}
                  disabled={!inStock}
                  className="h-full w-16 [appearance:textfield] rounded-none border-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  onChange={(e) => handleQuantityChange(e.target.value)}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-none border-l px-3"
                  onClick={increaseQuantity}
                  disabled={quantity >= stock || !inStock}
                >
                  <Plus size={16} />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            {stock > 0 && (
              <div className="text-sm text-slate-600">
                <span className="font-medium">{stock}</span> items available
              </div>
            )}
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <AddToCart
              className="flex-1 py-6"
              textVisible
              product={{
                id: product?._id,
                name: name,
                price: price,
                image: product?.images[0],
                stock,
              }}
              quantity={quantity}
              // disabled={!inStock}
            />
            <BuyNow
              className="flex-1 py-6"
              product={{
                id: product?._id,
                name: name,
                price: price,
                image: product?.images[0],
                stock,
              }}
              quantity={quantity}
              // disabled={!inStock}
            />
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="mt-6 rounded-lg border p-6"
          >
            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </TabsContent>
          <TabsContent
            value="specifications"
            className="mt-6 rounded-lg border p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Product Details</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between border-b pb-1">
                    <span className="text-slate-600">Category:</span>
                    <span className="font-medium capitalize">{category}</span>
                  </li>
                  {product.subCategory && (
                    <li className="flex justify-between border-b pb-1">
                      <span className="text-slate-600">Sub-Category:</span>
                      <span className="font-medium capitalize">
                        {product.subCategory}
                      </span>
                    </li>
                  )}
                  {product.sku && (
                    <li className="flex justify-between border-b pb-1">
                      <span className="text-slate-600">SKU:</span>
                      <span className="font-medium">{product.sku}</span>
                    </li>
                  )}
                </ul>
              </div>
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Available Variants</h3>
                  <ul className="space-y-1 text-sm">
                    {product.variants.map((variant, index) => (
                      <li
                        key={index}
                        className="flex justify-between border-b pb-1"
                      >
                        <span className="text-slate-600">
                          Size {variant.size}:
                        </span>
                        <span className="font-medium">
                          {variant.stock} available
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6 rounded-lg border p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <p className="mt-2 text-slate-600">
                Reviews will be displayed here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        {isLoading ? (
          <CardCarouselSkeleton />
        ) : products?.length > 1 ? (
          <>
            <Title className="mb-6">Similar Products</Title>
            <CardCarousel
              cardArr={products.filter((p: TProduct) => p._id !== product._id)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
