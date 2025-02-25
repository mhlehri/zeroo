"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetProducts } from "@/hooks/use-product";
import { useDebounce } from "@/lib/use-debounce";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useState } from "react";

export function CommandDialogSearch({
  children,
  isProductPage,
}: {
  isProductPage?: boolean;
  isSearchInputHidden?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const { products, isLoading } = useGetProducts({
    query: debouncedQuery,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/products?query=${encodeURIComponent(query.trim())}`);
        setOpen(false);
      }
    }
  };

  const handleProductClick = (productName: string) => {
    setQuery(productName);
    router.push(`/products?query=${encodeURIComponent(productName)}`);
    setOpen(false);
  };
  const isMobile = useIsMobile();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`relative block max-w-2xl outline-hidden md:w-full`}
      >
        {!children ? (
          <>
            <Input
              placeholder="Search by products..."
              className={`border-primary-200 hover:placeholder:text-primary-700 bg-white ${
                isMobile && isProductPage
                  ? "block h-8 w-full pl-7"
                  : "hidden pl-10"
              } rounded py-0 text-sm ring-0 outline-hidden placeholder:text-black/50 md:block`}
              onFocus={() => setOpen(true)}
            />
            <Search
              className={`z-50 text-black md:text-slate-800 ${isMobile && isProductPage ? "text-primary-400 absolute top-[25%] left-2 size-4" : "top-[20%] left-3 size-5 md:absolute md:size-6"} `}
            />
          </>
        ) : (
          children
        )}
      </DialogTrigger>
      <DialogContent className="fixed top-[20%] translate-y-[-20%] overflow-hidden p-0 shadow-lg md:top-[50%] md:translate-y-[-50%]">
        <Command className="">
          <CommandInput
            placeholder="Search products..."
            value={query}
            onValueChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <>
                {products?.length === 0 && query !== "" && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                {products?.length > 0 && (
                  <div>
                    {products?.map((product: TProduct) => (
                      <div
                        key={product?._id}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 p-2"
                        onClick={() => handleProductClick(product?.name)}
                      >
                        <Image
                          className="size-10 rounded-lg"
                          src={product?.images[0] || "/placeholder.svg"}
                          alt={product?.name}
                          width={50}
                          height={50}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {product.name}
                          </span>
                          <span className="text-muted-foreground text-xs font-medium">
                            {product?.category} •{" "}
                            <span className="font-mono slashed-zero">
                              TK {product?.price}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
