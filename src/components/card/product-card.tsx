import Image from "next/image";
import Link from "next/link";
import AddToCart from "../button/addToCart";
import BuyNow from "../button/buyNow";
import { Badge } from "../ui/badge";

export default function ProductCard({ product }: { product: TProduct }) {
  // console.log(product?.images[0], "Product Image");
  const discountedPrice =
    product.discountType === "percentage" && product.discountPrice
      ? product.price - (product.price * product.discountPrice) / 100
      : product.discountType === "fixed" && product.discountPrice
        ? product.price - product.discountPrice
        : product.discountType === ""
          ? product.price
          : (product.discountPrice ?? product.price);

  const productSend = {
    id: product?._id,
    name: product?.name,
    price: discountedPrice,
    image: product?.images[0],
    stock: product?.stock,
  };
  const isInStock = product?.stock > 0;
  return (
    <div className="group/card relative h-full w-full max-w-[230px] overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <Link href={`/products/${product?._id}`}>
        <div className="relative mb-2 aspect-square overflow-hidden">
          <Image
            src={product?.images[0]}
            className="h-full w-full bg-gray-100 object-cover transition-transform duration-300 group-hover/card:scale-105"
            width={300}
            height={300}
            alt={product?.name}
          />
          <Badge
            variant="destructive"
            className={`${product?.stock > 0 ? "hidden" : "block"} absolute top-2 right-2`}
          >
            Stock Out
          </Badge>
          {isInStock && product.discountPrice && (
            <Badge
              variant="secondary"
              className="absolute top-2 left-2 bg-teal-50 text-teal-600"
            >
              {product.discountType === "percentage"
                ? `${product.discountPrice}% OFF`
                : product.discountType === "fixed"
                  ? `${product.discountPrice} FLAT`
                  : null}
            </Badge>
          )}
        </div>
        <div className="mb-2 grid grid-rows-2 gap-0.5 px-4 md:gap-2">
          <h4 className="truncate text-sm font-medium capitalize md:text-base">
            {product?.name}
          </h4>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold md:text-base">
              TK{" "}
              {product.discountType !== "" && product?.discountPrice
                ? discountedPrice?.toFixed(2)
                : product?.price.toFixed(2)}
            </span>

            {product.discountType !== "" && product?.discountPrice ? (
              <span className="text-xs text-slate-500 line-through md:text-sm">
                TK {product.price.toFixed(2)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      <div className="flex gap-2 p-4 pt-0 *:flex-1 xl:gap-1">
        <AddToCart product={productSend} />
        <BuyNow product={productSend} />
      </div>
    </div>
  );
}
