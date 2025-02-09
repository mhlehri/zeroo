import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCategories } from "@/services/category";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const { data } = await getCategories();
  console.log(data.categories, data.categories.length, "from categories.tsx");
  const categories = data.categories;
  return (
    <section>
      <Carousel
        className="group z-40 w-full"
        opts={{
          align: "center",
          inViewThreshold: 0.5,
          dragFree: true,
          slidesToScroll: 3,
          duration: 25,
        }}
      >
        <CarouselContent className="-ml-4 select-none xl:-ml-5">
          {categories.map((category: TCategory, index: number) => (
            <CarouselItem key={index} className="basis-auto pl-4 xl:pl-5">
              <Link href={`/products?category=${category.name}`}>
                <div
                  className={`group/d relative flex flex-col items-center gap-2 md:gap-4`}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={140}
                    height={140}
                    className="size-16 rounded-full bg-cover object-cover md:size-[70px] lg:size-[140px] lg:rounded xl:size-[180px] 2xl:size-[200px]"
                  />
                  <div
                    className={`lg:group-hover/d:from-primary-950 items-end justify-center text-xs font-medium whitespace-nowrap transition duration-300 ease-out md:text-sm lg:invisible lg:absolute lg:inset-0 lg:flex lg:pb-4 lg:text-white lg:group-hover/d:visible lg:group-hover/d:z-50 lg:group-hover/d:rounded-lg lg:group-hover/d:bg-gradient-to-t lg:group-hover/d:px-2 lg:group-hover/d:py-1 lg:group-hover/d:text-white lg:group-hover/d:opacity-100`}
                  >
                    {category.name}
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-1/2 hidden w-full -translate-y-1/2 transform items-center justify-between lg:flex">
          <CarouselPrevious className="text-primary left-0 border-none p-0 2xl:-left-10" />
          <CarouselNext className="text-primary right-0 border-none p-0 2xl:-right-10" />
        </div>
      </Carousel>
    </section>
  );
}
