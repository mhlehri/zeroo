"use client";
import { useGetProductById } from "@/hooks/use-product";
import { useCategories } from "@/hooks/use-category";
import { updateProduct } from "@/services/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required."),
  stock: z.string().min(1, "Stock is required."),
  category: z.string().min(1, "Category is required."),
});

export default function UpdateProductForm({ id }: { id: string }) {
  const { product, isLoading } = useGetProductById(id);
  const { categories } = useCategories();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [errorImage, setErrorImage] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        category: product.category,
        price: String(product.price),
        stock: String(product.stock),
      });
      setImageUrls(product.images || []);
    }
  }, [product, form]);

  console.log(imageUrls, "imageUrls");

  const queryClient = useQueryClient();
  const { mutate: updateProductMutation, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const formData = { ...values, images: imageUrls };
      const res = await updateProduct({ id, formData });
      if (res.success) {
        toast.success(res.message, { richColors: true });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } else {
        toast.error(res.message, { richColors: true });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageUrls.length) {
      setErrorImage(true);
      return;
    }
    updateProductMutation(values);
  }
  function removeImage(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }
  console.log(imageUrls, "imageUrls");

  if (isLoading) return <Loader2 className="mx-auto my-2 animate-spin" />;

  return (
    <div className="roundeddd-lg mx-auto h-fit w-full max-w-md border p-6 shadow-lg md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-primary text-center text-2xl font-semibold md:text-3xl">
            Edit Product
          </h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Product Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Stock Quantity"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || product?.category || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((cat: TCategory) => (
                      <SelectItem
                        defaultChecked={
                          product?.category === cat ? true : false
                        }
                        key={cat.name}
                        value={cat.name}
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <CldUploadWidget
              signatureEndpoint={
                process.env.NEXT_PUBLIC_CLOUDINARY_SIGNATURE_ENDPOINT!
              }
              options={{
                context: {
                  caption: `${form.getValues("name")}`,
                  alt: `${form.getValues("name")} - ${form.getValues("category")}`,
                  metadata: {
                    productId: `${id}`,
                    category: `${form.getValues("category")}`,
                  },
                  tags: [`${form.getValues("category")}`],
                },
              }}
              uploadPreset="Zeroo_products"
              onSuccess={(result) => {
                if (typeof result.info !== "string" && result.info) {
                  const url = result.info.secure_url;
                  setImageUrls((prev) => [...prev, url]);
                  setErrorImage(false);
                }
              }}
            >
              {({ open }) => (
                <Button
                  type="button"
                  className="w-full"
                  variant="outline"
                  onClick={() => open()}
                >
                  Upload Images
                </Button>
              )}
            </CldUploadWidget>
            {errorImage && (
              <p className="text-xs text-red-500">Image is required!</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {imageUrls.map((image, index) => (
                <div key={index} className="group relative">
                  <Image
                    className="roundeddd size-24 border border-dashed p-1"
                    width={100}
                    height={100}
                    src={image}
                    alt={`Preview ${index}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="roundeddd-full absolute top-0 right-0 size-4 bg-red-500 text-xs text-white"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
