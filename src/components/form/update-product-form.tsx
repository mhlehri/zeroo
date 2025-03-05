"use client";
import { useGetProductById } from "@/hooks/use-product";
import { useCategories } from "@/hooks/use-category";
import { updateProduct } from "@/services/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget } from "next-cloudinary";
import { Controller, useForm } from "react-hook-form";
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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ImagePlus, Loader2, PackagePlus, X } from "lucide-react";
import { getSizes, getTags } from "@/services/inventory";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
  variants: z
    .array(
      z.object({
        size: z.string().min(1, { message: "Size is required" }),
        stock: z.number().min(0, { message: "Stock must be 0 or greater" }),
      }),
    )
    .optional(),
  tags: z.array(z.string()).optional(),
});

export default function UpdateProductForm({ id }: { id: string }) {
  const { product, isLoading } = useGetProductById(id);
  const { categories } = useCategories();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [errorImage, setErrorImage] = useState(false);
  const [variantSize, setVariantSize] = useState("");
  const [variantStock, setVariantStock] = useState("");
  const [tag, setTag] = useState("");

  const { data: availableSizes = [], isLoading: isSizesLoading } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
  });

  const { data: availableTags = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

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

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        category: product.category,
        price: String(product.price),
        stock: String(product.stock),
        discountPrice: product.discountPrice
          ? String(product.discountPrice)
          : "",
        discountType: product.discountType || "",
        sku: product.sku || "",
        variants: product.variants || [],
        tags: product.tags || [],
      });
      setImageUrls(product.images || []);

      // Update editor content if it exists
      if (editor && product.description) {
        editor.commands.setContent(product.description);
      }
    }
  }, [product, form, editor]);

  const queryClient = useQueryClient();
  const { mutate: updateProductMutation, isPending } = useMutation({
    mutationKey: ["products", id],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (!imageUrls.length) {
        setErrorImage(true);
        throw new Error("At least one image is required");
      }

      const formData = {
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
        discountPrice: values.discountPrice ? Number(values.discountPrice) : 0,
        discountType: values.discountType || "",
        images: imageUrls,
      };

      const res = await updateProduct({ id, formData });
      if (res.success) {
        toast.success(res.message, { richColors: true });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        return res;
      } else {
        toast.error(res.message, { richColors: true });
        throw new Error(res.message);
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

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mb-14 md:container md:mb-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="fixed bottom-0 z-50 w-full border bg-white p-2 shadow-xs md:relative md:mb-4 md:flex md:items-center md:justify-between md:rounded-lg md:p-6">
            <h3 className="hidden text-lg font-semibold text-balance text-slate-950 sm:text-xl md:block md:text-2xl lg:text-3xl">
              Update Product
            </h3>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                onClick={() => {
                  if (product) {
                    form.reset({
                      name: product.name,
                      description: product.description,
                      category: product.category,
                      price: String(product.price),
                      stock: String(product.stock),
                      discountPrice: product.discountPrice
                        ? String(product.discountPrice)
                        : "",
                      discountType: product.discountType || "",
                      sku: product.sku || "",
                      variants: product.variants || [],
                      tags: product.tags || [],
                    });
                    setImageUrls(product.images || []);
                    if (editor && product.description) {
                      editor.commands.setContent(product.description);
                    }
                  }
                }}
                variant="outline"
                type="button"
                disabled={isPending}
                className="capitalize"
              >
                Reset Changes
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={isPending}
                className="capitalize"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <span className="flex gap-1">
                    <PackagePlus /> Update Product
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="grid gap-8 p-4 md:grid-cols-2 md:p-0">
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6 shadow-xs">
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
                                <div className="flex min-h-[80px] w-full flex-col rounded-md border border-slate-200">
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

              <div className="rounded-lg border bg-white p-6 shadow-xs">
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
                            value={field.value || product?.discountType}
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

              <div className="rounded-lg border bg-white p-6 shadow-xs">
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
              <div className="rounded-lg border bg-white p-6 shadow-xs">
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

              <div className="rounded-lg border bg-white p-6 shadow-xs">
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
                          value={field.value || product?.category}
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
              <div className="mt-6 rounded-lg border bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Variants</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Select
                      value={variantSize}
                      onValueChange={setVariantSize}
                      disabled={isSizesLoading || availableSizes.length === 0}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue
                          placeholder={
                            isSizesLoading
                              ? "Loading sizes..."
                              : availableSizes.length === 0
                                ? "No sizes available"
                                : "Select a size"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSizes.map((size: string) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      className="flex-1"
                      type="number"
                      placeholder="Stock"
                      value={variantStock}
                      onChange={(e) => setVariantStock(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={addVariant}
                      variant="secondary"
                      disabled={!variantSize || !variantStock || isSizesLoading}
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
              <div className="mt-6 rounded-lg border bg-white p-6 shadow-xs">
                <h2 className="mb-4 text-xl font-semibold">Tags</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Select
                      value={tag}
                      onValueChange={setTag}
                      disabled={isTagsLoading || availableTags.length === 0}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue
                          placeholder={
                            isTagsLoading
                              ? "Loading tags..."
                              : availableTags.length === 0
                                ? "No tags available"
                                : "Select a tag"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTags.map((tagItem: string) => (
                          <SelectItem key={tagItem} value={tagItem}>
                            {tagItem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={addTag}
                      variant="secondary"
                      disabled={!tag || isTagsLoading}
                    >
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
