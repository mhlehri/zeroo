"use client";
import { loginAction } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/user-provider";
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email.",
  }),
  password: z.string().min(1, {
    message: "password is required.",
  }),
});

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { setLoading } = useUser();
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // console.log(redirect, "redirect");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "values");
    const res = await loginAction(values);
    console.log(res, "login action");
    if (res.success) {
      toast.success(res.message, {
        richColors: true,
      });
      setLoading(true);
      router.push(redirect);
    } else {
      toast.error(res.message, {
        richColors: true,
      });
    }
  }
  const submitting = form.formState.isSubmitting;
  return (
    <div className="relative z-40 h-fit w-full max-w-md rounded-lg border p-6 shadow-xs sm:p-8 md:p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-40 space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-2xl font-semibold md:text-3xl">
            Login
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                form.setValue("email", "guest@gmail.com");
                form.setValue("password", "123456");
              }}
            >
              Login as Guest
            </Button>
            <Button
              onClick={() => {
                form.setValue("email", "admin@gmail.com");
                form.setValue("password", "123456");
              }}
            >
              Login as Admin
            </Button>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
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
                  <Input
                    placeholder="Enter password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={submitting} type="submit">
            {submitting ? "Checking..." : "Continue"}
          </Button>
          <p className="text-center text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-black underline">
              Signup
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
