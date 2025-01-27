"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signupAction } from "@/services/auth";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
  address: z.string().min(2, {
    message: "address is required.",
  }),
  phone: z.string().min(1, {
    message: "phone number is required.",
  }),
});

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      phone: "",
    },
  });
  const { mutate: registerUser } = useMutation<unknown, Error, FieldValues>({
    mutationKey: ["user"],
    mutationFn: async (values: FieldValues) => {
      const res = await signupAction(values);
      if (res.success) {
        toast.success(res.message, {
          richColors: true,
        });
        router.push("/login");
      } else {
        toast.error(res.message, {
          richColors: true,
        });
      }
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "values");
    registerUser(values);
  }
  const submitting = form.formState.isSubmitting;
  return (
    <div className="w-full max-w-md p-6 md:p-8 rounded-lg shadow-lg border h-fit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
          <h3 className="text-primary text-2xl md:text-3xl font-semibold text-center">
            Signup
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="phone number" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*****" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
