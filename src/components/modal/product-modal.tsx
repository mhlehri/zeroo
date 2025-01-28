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
      <DialogTrigger className="relative cursor-pointer  w-full text-left select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-slate-800 dark:focus:text-slate-50">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[500px] xl:max-h-full overflow-y-auto">
        <div className="flex flex-col my-4 w-full  gap-4 justify-center">
          <div className="max-w-[280px]">
            <EmblaCarousel slides={slides} />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">
                ({rating} out of 5 stars)
              </span>
            </div>
            <p className="text-2xl text-gray-900">
              ৳<span className="font-bold">{price?.toFixed(2)}</span>
            </p>
            <p className="text-gray-700">{description}</p>
            <p className={`${stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {stock > 0 ? `In stock (${stock} available)` : "Out of stock"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
