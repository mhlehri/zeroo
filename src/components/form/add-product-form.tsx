"use client";
import { useCategories } from "@/hooks/use-category";
import { addProduct } from "@/services/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
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
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .optional(),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  stock: z.string().min(1, {
    message: "Stock is required.",
  }),
  category: z.string().min(1, {
    message: "Category number is required.",
  }),
});

export default function AddProductForm() {
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
  const queryClient = useQueryClient();
  const { mutate: createProduct } = useMutation<unknown, Error, FieldValues>({
    mutationKey: ["products"],
    mutationFn: async (values: FieldValues) => {
      const res = await addProduct(values);
      console.log(res, "res fdfdflfjsdklf");
      if (res.success) {
        toast.success(res.message, {
          richColors: true,
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        form.reset();
        setImageUrls([]);
      } else {
        toast.error(res.message, {
          richColors: true,
        });
      }
    },
  });
  const [errorImage, setErrorImage] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { categories } = useCategories();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const price = parseFloat(values.price);
    const stock = parseFloat(values.stock);
    const formData = { ...values, price, stock, images: imageUrls };
    if (!imageUrls.length) {
      setErrorImage(true);
    } else {
      createProduct(formData);
      setErrorImage(false);
    }
  }

  // const handleTagsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const amenitiesList = e.target.value.split(",").map((item) => item.trim());
  //   setAmenities(amenitiesList);
  // };

  const submitting = form.formState.isSubmitting;
  console.log(imageUrls);
  return (
    <div className="w-full max-w-md p-6 md:p-8 rounded-lg shadow-lg border h-fit mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-2xl md:text-3xl font-semibold text-center">
            Add Product
          </h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
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
                  <Textarea placeholder="product description here" {...field} />
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
                  <Input placeholder="product price" type="number" {...field} />
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
                  <Input type="number" placeholder="product stock" {...field} />
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
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category?.name} value={category?.name}>
                        {category?.name}
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
              uploadPreset="zeroo_products" // Replace with your Cloudinary upload preset
              onSuccess={(result, { widget }) => {
                const info = result?.info;
                if (
                  info &&
                  typeof info === "object" &&
                  "secure_url" in info &&
                  typeof info.secure_url === "string"
                ) {
                  setImageUrls((prev) => [...prev, info.secure_url]);
                  setErrorImage(false);
                  widget.close();
                }
              }}
            >
              {({ open }) => (
                <Button
                  type="button"
                  className={`border-dashed ${
                    errorImage ? "border-red-500" : "border-slate-300"
                  } w-full`}
                  variant="outline"
                  onClick={() => open()}
                >
                  Upload Images
                </Button>
              )}
            </CldUploadWidget>
            {errorImage ? (
              <p className="text-xs text-red-500">Image is required!</p>
            ) : null}

            <div className="flex gap-2 flex-wrap">
              {imageUrls.length > 0 &&
                imageUrls.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      className="size-24 border p-2 border-dashed border-slate-300 rounded"
                      width={100}
                      height={100}
                      src={image}
                      alt={`Preview ${index}`}
                    />
                  </div>
                ))}
            </div>
          </div>

          <Button disabled={submitting} type="submit">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
