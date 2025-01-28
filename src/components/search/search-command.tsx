"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/use-product";
import { useDebounce } from "@/lib/use-debounce";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useState } from "react";

export function CommandDialogSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const { products, isLoading } = useProducts({
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="block w-full md:max-w-sm relative outline-none">
        <Input
          placeholder="Search by products..."
          className="bg-black/5 rounded-lg outline-none ring-0 border-primary-200 hover:placeholder:text-primary-700 placeholder:text-black/50 py-0 hidden md:block text-sm"
          onFocus={() => setOpen(true)}
        />
        <Search className="text-primary md:absolute right-2 top-[20%]" />
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden p-0 shadow-lg top-[20%] fixed translate-y-[-20%]"
        dir=""
      >
        <Command>
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
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
                        onClick={() => handleProductClick(product?.name)}
                      >
                        <Image
                          className="rounded-lg"
                          src={product?.images[0] || "/placeholder.svg"}
                          alt={product?.name}
                          width={50}
                          height={50}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {product?.category} • {product?.price}
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
