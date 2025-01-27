import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export default function ProductCard({ product }: { product: TProduct }) {
  return (
    <Card>
      <CardHeader>
        <Image src={"/1.jpg"} width={300} height={200} alt="" />
      </CardHeader>
      <CardContent className="space-y-2">
        <h4 className="uppercase font-bold">{product?.name}</h4>
        <p className="text-sm font-bold">${product?.price.toPrecision(2)}</p>
      </CardContent>
      <CardFooter className="*:w-full *:uppercase gap-1 flex flex-col">
        <Button size="xs" className="text-sm">
          Add to Cart
        </Button>
        <Button size="xs" className="text-sm" variant="outline">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
