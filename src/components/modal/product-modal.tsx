"use client";
import { Star } from "lucide-react";
import EmblaCarousel from "../pages/product/EmblaCarousel";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function ProductModal({
  product,
  children,
}: {
  product: TProduct;
  children: React.ReactNode;
}) {
  const slides = product?.images;
  const { name, price, description, stock } = product || {
    name: "",
    price: 0,
    description: "",
    stock: 0,
  };
  const rating = 4;

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-primary-100 hover:text-primary-900 relative w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[500px] overflow-y-auto xl:max-h-full">
        <div className="my-4 flex w-full flex-col justify-center gap-4">
          <div className="max-w-[280px] sm:max-w-[320px]">
            <EmblaCarousel slides={slides} />
          </div>
          <div className="space-y-3">
            <h1 className="text-primary-900 text-3xl font-bold">{name}</h1>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < rating
                      ? "fill-current text-yellow-400"
                      : "text-primary-300"
                  }`}
                />
              ))}
              <span className="text-primary-600 ml-2">
                ({rating} out of 5 stars)
              </span>
            </div>
            <p className="text-primary-900 text-2xl">
              TK <span className="font-bold">{price?.toFixed(2)}</span>
            </p>
            <div
              className="text-primary-700"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <p className={`${stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {stock > 0 ? `In stock (${stock} available)` : "Out of stock"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
