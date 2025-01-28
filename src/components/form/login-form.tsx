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
    <div className="w-full max-w-md p-6 md:p-8 rounded-lg shadow-lg border h-fit">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-2xl md:text-3xl font-semibold text-center">
            Login
          </h3>
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
            {submitting ? "Checking..." : "Continue"}
          </Button>
          <p className="text-xs text-slate-600 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black font-semibold underline">
              Signup
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
