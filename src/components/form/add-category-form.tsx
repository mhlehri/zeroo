"use client";
import { addCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
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
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function AddCategoryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutate: createCategory } = useMutation<unknown, Error, FieldValues>({
    mutationKey: ["categories"],
    mutationFn: async (values: FieldValues) => {
      const res = await addCategory(values);
      console.log(res, "res category");
      if (res.success) {
        toast.success(res.message, {
          richColors: true,
        });
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = { ...values, images: imageUrls };
    if (imageUrls.length) {
      createCategory(formData);
    } else {
      setErrorImage(true);
    }
  }

  const submitting = form.formState.isSubmitting;
  console.log(imageUrls);
  return (
    <div className="w-full max-w-md p-6 md:p-8 rounded-lg shadow-lg border h-fit">
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

          <div>
            <CldUploadWidget
              uploadPreset="zeroo_products"
              options={{
                multiple: false,
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
                  widget.close();
                }
              }}
            >
              {({ open }) => (
                <Button
                  type="button"
                  className={`border-dashed ${
                    errorImage ? "border-red-500" : ""
                  } w-full border-slate-300`}
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
                      className="size-10 border rounded"
                      width={50}
                      height={50}
                      src={image}
                      alt={`Preview ${index}`}
                    />
                    <button className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      ×
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <Button disabled={submitting} type="submit">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
          <p className="text-xs text-slate-600 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-semibold underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
