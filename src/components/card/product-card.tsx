import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";

export default function ProductCard({ product }: { product: TProduct }) {
  console.log(product?.images[0], "Product Image");
  return (
    <Card className="overflow-hidden w-full max-w-[230px] md:max-w-[270px]">
      <Link href={`/products/${product?._id}`}>
        <CardHeader className="p-0 sm:p-2 md:p-3">
          <Image
            src={product?.images[0]}
            className="w-full h-[200px] rounded-none sm:rounded md:rounded-lg"
            width={300}
            height={240}
            alt={product?.name}
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="gap-0.5 md:gap-2 px-2 py-2 md:pb-4 md:px-4 md:pt-0 text-center grid grid-rows-2">
          <h4 className="uppercase text-sm md:text-base truncate">
            {product?.name}
          </h4>
          <h6 className="text-sm md:text-base">
            ৳<span className="font-bold">{product?.price.toFixed(2)}</span>
          </h6>
        </CardContent>
      </Link>
      <CardFooter className="px-2 md:px-4 pt-0 pb-2 md:pb-4">
        <Button
          variant="outline"
          className="text-xs md:text-sm w-full"
          size="sm"
        >
          <ShoppingCart /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
