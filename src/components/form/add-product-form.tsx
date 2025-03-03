"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, type FieldValues, useForm } from "react-hook-form";

import { ImagePlus, PackagePlus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-category";
import { addProduct } from "@/services/product";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CldUploadWidget } from "next-cloudinary";
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
    message: "Price must be greater than or equal to 0.",
  }),
  stock: z.string().min(1, {
    message: "Stock must be greater than or equal to 0.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  discountPrice: z.string().optional(),
  discountType: z.string().optional(),
  sku: z.string().optional(),
  images: z
    .array(z.string())
    .min(1, { message: "At least one image is required" }),
  variants: z
    .array(
      z.object({
        size: z.string().min(1, { message: "Size is required" }),
        stock: z.number().min(1, { message: "Stock must be 0 or greater" }),
      }),
    )
    .optional(),
  tags: z.array(z.string()).optional(),
});

export default function ProductForm() {
  const [errorImage, setErrorImage] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { categories } = useCategories();
  const queryClient = useQueryClient();
  const [variantSize, setVariantSize] = useState("");
  const [variantStock, setVariantStock] = useState("");
  const [tag, setTag] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      discountPrice: "",
      discountType: "",
      sku: "",
      images: [],
      variants: [],
      tags: [],
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
    FieldValues
  >({
    mutationKey: ["products"],
    mutationFn: async (values) => {
      const res = await addProduct(values);
      console.log(values, "values");
      console.log(res, "res");
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

  console.log(form.formState.errors, "errors");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "values");
    if (!imageUrls.length) {
      setErrorImage(true);
      return;
    }
    const formData = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
      discountPrice: values.discountPrice ? Number(values.discountPrice) : 0,
      images: imageUrls,
    };
    console.log(formData, "formData");

    createProduct({
      ...formData,
      images: imageUrls,
    });
    setErrorImage(false);
  }

  function removeImage(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      "images",
      imageUrls.filter((_, i) => i !== index),
    );
  }

  const addVariant = () => {
    if (variantSize && variantStock) {
      const currentVariants = form.getValues("variants") || [];
      const isDuplicate = currentVariants.some(
        (variant) => variant.size.toLowerCase() === variantSize.toLowerCase(),
      );
      if (!isDuplicate) {
        form.setValue("variants", [
          ...currentVariants,
          { size: variantSize, stock: Number.parseInt(variantStock) },
        ]);
        setVariantSize("");
        setVariantStock("");
      } else {
        toast.error("This variant size already exists.");
      }
    }
  };

  const removeVariant = (index: number) => {
    const currentVariants = form.getValues("variants") || [];
    form.setValue(
      "variants",
      currentVariants.filter((_, i) => i !== index),
    );
  };

  const addTag = () => {
    if (tag) {
      const currentTags = form.getValues("tags") || [];
      const isDuplicate = currentTags.some(
        (existingTag) => existingTag.toLowerCase() === tag.toLowerCase(),
      );
      if (!isDuplicate) {
        form.setValue("tags", [...currentTags, tag]);
        setTag("");
      } else {
        toast.error("This tag already exists.");
      }
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((_, i) => i !== index),
    );
  };

  const submitting = form.formState.isSubmitting || isPending;

  type TCategory = {
    name: string;
  };

  return (
    <div className="mb-14 md:container md:mb-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="md:roundeddd-lg fixed bottom-0 z-50 w-full border bg-white p-2 shadow-xs md:relative md:mb-4 md:flex md:items-center md:justify-between md:p-6">
            <h3 className="hidden text-lg font-semibold text-balance text-slate-950 sm:text-xl md:block md:text-2xl lg:text-3xl">
              Add Product
            </h3>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                onClick={() => {
                  form.reset();
                  setImageUrls([]);
                  setVariantSize("");
                  setVariantStock("");
                }}
                variant="destructive"
                type="button"
                disabled={submitting}
                className="capitalize"
              >
                discard changes
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={submitting}
                className="capitalize"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <span className="flex gap-1">
                    <PackagePlus /> add product
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="grid gap-8 p-4 md:grid-cols-2 md:p-0">
            <div className="space-y-6">
              <div className="roundeddd-lg border bg-white p-6 shadow-xs">
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
                                <div className="roundeddd-md flex min-h-[80px] w-full flex-col border border-slate-200">
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

              <div className="roundeddd-lg border bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Pricing</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Price</FormLabel>
                        <FormControl>
                          <Input
                            min="0"
                            type="number"
                            placeholder="Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                </div>
              </div>

              <div className="roundeddd-lg border bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Inventory</h2>
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
                  />

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
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="roundeddd-lg border bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Product Media</h2>
                <div className="roundeddd-lg border-2 border-dashed p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {imageUrls.map((image, index) => (
                      <div key={index} className="group relative">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          width={100}
                          height={100}
                          className="roundeddd-lg aspect-square w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="roundeddd-full absolute top-1 right-1 size-6 bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <CldUploadWidget
                    signatureEndpoint={
                      process.env.NEXT_PUBLIC_CLOUDINARY_SIGNATURE_ENDPOINT!
                    }
                    uploadPreset="Zeroo_products"
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
                      // Remove this line to prevent duplicate uploads
                      // onUploadSuccess(result);
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
                  {form.formState.errors.images && (
                    <p className="mt-2 text-xs text-red-500">
                      {form.formState.errors.images.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="roundeddd-lg border bg-white p-6 shadow-xs">
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
                            {categories?.map((category: TCategory) => (
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
                </div>
              </div>

              {/* Add Variants section */}
              <div className="roundeddd-lg mt-6 border bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Variants</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Size"
                      value={variantSize}
                      onChange={(e) => setVariantSize(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Stock"
                      value={variantStock}
                      onChange={(e) => setVariantStock(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={addVariant}
                      variant="secondary"
                    >
                      Add Variant
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {form.watch("variants")?.map((variant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>
                          {variant.size} - Stock: {variant.stock}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariant(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Tags section */}
              <div className="roundeddd-lg mt-6 border bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Tags</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="secondary">
                      Add Tag
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.watch("tags")?.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => removeTag(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
