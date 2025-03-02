import Image from "next/image";
import Link from "next/link";
import AddToCart from "../button/addToCart";
import BuyNow from "../button/buyNow";
import { Badge } from "../ui/badge";

export default function ProductCard({ product }: { product: TProduct }) {
  // console.log(product?.images[0], "Product Image");
  const productSend = {
    id: product?._id,
    name: product?.name,
    price: product?.price,
    image: product?.images[0],
    stock: product?.stock,
  };
  return (
    <div className="mb-4 w-full max-w-[230px] overflow-hidden rounded-md border-none shadow-none">
      <Link href={`/products/${product?._id}`}>
        <div className="relative mb-2">
          <Image
            src={product?.images[0]}
            className="h-[200px] w-full rounded-md bg-gray-100 lg:h-[240px]"
            width={240}
            height={240}
            alt={product?.name}
          />
          <Badge
            variant="destructive"
            className={`${product?.stock > 0 ? "hidden" : "block"} absolute top-2 right-2`}
          >
            Stock Out
          </Badge>
        </div>
        <div className="mb-2 grid grid-rows-2 gap-0.5 md:gap-2">
          <h4 className="truncate text-sm font-medium capitalize md:text-base">
            {product?.name}
          </h4>
          <h6 className="text-sm md:text-base">
            TK <span className="font-bold">{product?.price.toFixed(2)}</span>
          </h6>
        </div>
      </Link>
      <div className="max-w-[1360px]:flex-nowrap flex flex-wrap gap-2 xl:gap-1">
        <AddToCart textVisible product={productSend} />
        <BuyNow product={productSend} />
      </div>
    </div>
  );
}
