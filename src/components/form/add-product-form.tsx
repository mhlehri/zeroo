"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget } from "next-cloudinary";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-category";
import { addProduct } from "@/services/product";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { MenuBar } from "../Tiptap";

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
    message: "Category is required.",
  }),
  // discountPrice: z.string().optional(),
  // discountType: z.string().optional(),
  // sku: z.string().optional(),
  // variationType: z.string().optional(),
  // skuVariation: z.string().optional(),
});

export default function ProductForm() {
  const [errorImage, setErrorImage] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { categories } = useCategories();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      // discountPrice: "",
      // discountType: "",
      // sku: "",
      // variationType: "",
      // skuVariation: "",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: "Write something …",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: form.watch("description") || "",
    onUpdate: ({ editor }) => {
      form.setValue("description", editor.getHTML());
    },
  });

  const { mutate: createProduct, isPending } = useMutation<
    unknown,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ["products"],
    mutationFn: async (values) => {
      const res = await addProduct({
        ...values,
        price: parseInt(values.price),
        stock: parseInt(values.stock),
        images: imageUrls,
      });
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageUrls.length) {
      setErrorImage(true);
      return;
    }

    createProduct(values);
    setErrorImage(false);
  }

  function removeImage(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  const submitting = form.formState.isSubmitting || isPending;
  console.log(submitting);

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 flex items-center justify-between rounded-lg border p-6 shadow-xs">
            <h3 className="text-primary-950 text-lg font-semibold text-balance sm:text-xl md:text-2xl lg:text-3xl">
              Add Product
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => form.reset()}
                variant="destructive"
                type="button"
                disabled={submitting}
                className="capitalize"
              >
                discard changes
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="capitalize"
              >
                {submitting ? "Submitting..." : "add product"}
              </Button>
            </div>
          </div>
          {/* Left Column */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg border p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">
                  General Information
                </h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
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
                    render={({}) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Controller
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                              <div className="relative">
                                <div className="border-primary-200 bg-primary-100/30 flex min-h-[80px] w-full flex-col rounded-md border">
                                  <MenuBar editor={editor} />
                                  <EditorContent
                                    className="prose prose-h3:m-0 prose-p:m-0 min-h-20 border-none p-2"
                                    editor={editor}
                                    {...field}
                                  />
                                </div>
                              </div>
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Pricing</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Price (% / fixed)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="25" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a discount type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentage">
                                Percentage
                              </SelectItem>
                              <SelectItem value="fixed">
                                Fixed Amount
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}
                </div>
              </div>

              <div className="rounded-lg border p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Inventory</h2>
                {/* 
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="SKU" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Stock Quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* </div> */}
              </div>

              {/* <div className="rounded-lg border p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Variation</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="variationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variation Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Variation Type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skuVariation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU Variation</FormLabel>
                        <FormControl>
                          <Input placeholder="SKU Variation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> */}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="rounded-lg border p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Product Media</h2>
                <div className="rounded-lg border-2 border-dashed p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {imageUrls.map((image, index) => (
                      <div key={index} className="group relative">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          width={100}
                          height={100}
                          className="aspect-square w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 size-6 rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <CldUploadWidget
                    signatureEndpoint={
                      process.env.NEXT_PUBLIC_CLOUDINARY_SIGNATURE_ENDPOINT!
                    }
                    uploadPreset="zeroo_products"
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
                        onClick={() => open()}
                        className={`mt-2 w-full ${errorImage ? "border-red-500" : ""}`}
                        variant="outline"
                      >
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Add Image
                      </Button>
                    )}
                  </CldUploadWidget>
                  {errorImage && (
                    <p className="mt-2 text-xs text-red-500">
                      Image is required!
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Category</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem
                                key={category?.name}
                                value={category?.name}
                              >
                                {category?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem
                                key={category?.name}
                                value={category?.name}
                              >
                                {category?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
