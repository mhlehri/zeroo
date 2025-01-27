import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function ProductCard({ product }: { product: TProduct }) {
  console.log(product?.images[0], "Product Image");
  return (
    <Card className="overflow-hidden w-full max-w-[230px] md:max-w-[270px]">
      <CardHeader className="p-2 md:p-3">
        <Image
          src={product?.images[0]}
          className="w-full h-[200px] rounded md:rounded-lg"
          width={300}
          height={240}
          alt={product?.name}
        />
      </CardHeader>
      <CardContent className="space-y-3 px-2 md:px-4 pt-0">
        <h4 className="uppercase text-sm truncate">{product?.name}</h4>
        <h6 className="text-xl md:text-2xl">
          ৳
          <span className="font-bold lg:text-3xl">
            {product?.price.toFixed(2)}
          </span>
        </h6>
        <Button className="text-xs md:text-sm w-full" size="sm">
          <ShoppingCart /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
