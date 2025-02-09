"use client";
import { addCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
  const [errorImage, setErrorImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
        setImageUrl("");
      } else {
        toast.error(res.message, {
          richColors: true,
        });
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = { ...values, image: imageUrl };
    if (!imageUrl?.length) {
      setErrorImage(true);
    } else {
      setErrorImage(false);
      createCategory(formData);
    }
  }

  const submitting = form.formState.isSubmitting;
  console.log(imageUrl);
  return (
    <div className="mx-auto h-fit w-full max-w-md rounded-lg border p-6 shadow-lg md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-center text-2xl font-semibold md:text-3xl">
            Add Category
          </h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <CldUploadWidget
              signatureEndpoint={
                process.env.NEXT_PUBLIC_CLOUDINARY_SIGNATURE_ENDPOINT!
              }
              uploadPreset="zeroo_products"
              options={{
                multiple: false,
                context: {
                  caption: `${form.getValues("name")}`,
                  alt: `${form.getValues("name")}-image`,
                },
                tags: [`${form.getValues("name")}`],
              }}
              onSuccess={(result, { widget }) => {
                const info = result?.info;
                if (
                  info &&
                  typeof info === "object" &&
                  "secure_url" in info &&
                  typeof info.secure_url === "string"
                ) {
                  setImageUrl(info.secure_url);
                  setErrorImage(false);
                  widget.close();
                }
              }}
            >
              {({ open }) => (
                <Button
                  type="button"
                  className={`border-dashed ${
                    errorImage
                      ? "border-red-500 text-red-500"
                      : "border-slate-300"
                  } w-full`}
                  variant="outline"
                  onClick={() => open()}
                >
                  Upload Image
                </Button>
              )}
            </CldUploadWidget>
            {errorImage ? (
              <p className="mt-1 text-xs text-red-500">Image is required!</p>
            ) : null}

            {imageUrl && (
              <Image
                className="mt-2 size-32 rounded border border-dashed border-slate-300 p-2"
                width={100}
                height={100}
                src={imageUrl}
                alt={`Preview image`}
              />
            )}
          </div>

          <Button disabled={submitting} type="submit">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
