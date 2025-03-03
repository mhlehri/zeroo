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
  const { categories, total } = await getCategories();
  console.log(categories, total, "from categories.tsx");
  if (total === 0) return <></>;
  return (
    <div>
      {categories.length <= 5 ? (
        <div className="grid grid-cols-2 justify-between gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category: TCategory, index: number) => (
            <Link
              href={`/products?category=${category.name}`}
              key={index}
              className="group roundeddd-lg relative overflow-hidden"
            >
              <span className="absolute inset-0 z-20 bg-black/20 opacity-0 duration-700 group-hover:opacity-100" />
              <Image
                src={category?.image}
                alt={category?.name}
                width={600}
                height={400}
                className="bg-primary-100 roundeddd-lg relative z-10 h-full max-h-52 w-full max-w-3xl transform duration-700 group-hover:scale-110"
              />
            </Link>
          ))}
        </div>
      ) : (
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
                      className="roundeddd-full lg:roundeddd size-16 bg-cover object-cover md:size-[70px] lg:size-[140px] xl:size-[180px] 2xl:size-[200px]"
                    />
                    <div
                      className={`lg:group-hover/d:from-primary-950 lg:group-hover/d:roundeddd-lg items-end justify-center text-xs font-medium whitespace-nowrap transition duration-300 ease-out md:text-sm lg:invisible lg:absolute lg:inset-0 lg:flex lg:pb-4 lg:text-white lg:group-hover/d:visible lg:group-hover/d:z-50 lg:group-hover/d:bg-gradient-to-t lg:group-hover/d:px-2 lg:group-hover/d:py-1 lg:group-hover/d:text-white lg:group-hover/d:opacity-100`}
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
      )}
    </div>
  );
}
