"use client";
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
import { useCart } from "@/context/cart-provider";
import { useUser } from "@/context/user-provider";
import { useUserById } from "@/hooks/use-user";
import { addOrder } from "@/services/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, ShoppingBag, Trash2, Truck, Wallet2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// // Load Stripe
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// Form Schema for validation
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Street Address is required" }),
  paymentMethod: z.enum(["cash", "online"]), // Add payment method to the schema
  shipping: z.enum(["Inside Dhaka", "Outside Dhaka"]), // Add shipping method to the schema
});

export default function Checkout() {
  const searchParams = useSearchParams();
  const shipping = searchParams.get("shipping");
  console.log(shipping);
  // const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cod">(
  //   "stripe"
  // );
  const { user } = useUser();
  const { user: u } = useUserById(user?.id as string);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const { cart, cartLoading, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: u?.name || "",
      email: u?.email || "",
      phone: u?.phone || "",
      address: u?.address || "",
      paymentMethod: "cash",
      shipping:
        shipping === "Inside Dhaka" || shipping === "Outside Dhaka"
          ? shipping
          : "Inside Dhaka",
    },
  });
  useEffect(() => {
    if (u) {
      form.reset({
        name: u.name,
        email: u.email,
        address: u.address,
        phone: u.phone,
      });
    }
  }, [u, form]);
  console.log(user, "user");
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = async (data: z.infer<typeof FormSchema>) => {
    try {
      setProcessing(true);
      const { name, email, phone, address, paymentMethod } = data;
      const res = await addOrder({
        name,
        email,
        phone,
        address,
        paymentMethod,
        user: user?.id,
        products: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        totalAmount:
          calculateTotal() +
          (form.watch("shipping") === "Inside Dhaka" ? 80 : 120),
        orderStatus: "unconfirmed",
        paymentStatus: "pending",
      });

      if (paymentMethod === "online") {
        if (res.data?.payment_url) {
          window.location.href = res?.data?.payment_url;
        }
        clearCart();
      } else {
        if (res.success) {
          toast.success("Order placed successfully!", { richColors: true });
          setProcessing(false);
          clearCart();
        } else {
          toast.error(res.message, {
            richColors: true,
          });
          setProcessing(false);
        }
      }

      // Log shipping method
      console.log("FormData:", data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  if (cartLoading) return <div className="loader mx-auto" />;

  if (cart?.length === 0) {
    router.push("/products");
  }

  return (
    <div className="">
      {/* <h1 className="text-primary-800 mb-8 text-center text-3xl font-bold">
        Checkout
      </h1> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitOrder)}
          className="space-y-4"
        >
          <div className="flex h-full flex-col justify-center md:flex-row">
            <div className="min-h-full w-full p-3 md:bg-white md:py-10 md:pr-10">
              {/* Shipping Information */}
              <div className="w-full max-w-xl space-y-3 md:mr-0 md:ml-auto">
                <h2 className="mb-4 flex items-center text-xl font-semibold md:text-2xl">
                  <Truck className="mr-2" /> Shipping Information
                </h2>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
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
                        <Input placeholder="+800" {...field} />
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
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Shipping Method Radio Buttons */}
                <FormField
                  control={form.control}
                  name="shipping"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="Inside Dhaka"
                              checked={field.value === "Inside Dhaka"}
                              onChange={() => field.onChange("Inside Dhaka")}
                              className="form-radio"
                            />
                            <span>Inside Dhaka (৳80.00)</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="Outside Dhaka"
                              checked={field.value === "Outside Dhaka"}
                              onChange={() => field.onChange("Outside Dhaka")}
                              className="form-radio"
                            />
                            <span>Outside Dhaka (৳120.00)</span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="online"
                              checked={field.value === "online"}
                              onChange={() => field.onChange("online")}
                              className="form-radio"
                            />
                            <span className="flex items-center gap-2">
                              <Wallet2 className="h-4 w-4" /> Online Payment
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="cash"
                              checked={field.value === "cash"}
                              onChange={() => field.onChange("cash")}
                              className="form-radio"
                            />
                            <span className="flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4" /> Cash on
                              Delivery
                            </span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={processing}
                  className="mt-3 hidden w-full md:block md:text-lg"
                >
                  {processing
                    ? "Processing..."
                    : form.getValues("paymentMethod") === "online"
                      ? "Pay Now"
                      : "Place Order"}
                </Button>
              </div>
            </div>
            <div className="w-full md:bg-[#f5f5f5] md:pl-10">
              {/* Order Summary */}
              <div className="w-full max-w-xl space-y-2 p-3 md:space-y-4 md:py-10">
                <h2 className="flex items-center text-xl font-semibold md:text-2xl">
                  <ShoppingBag className="mr-2" /> Cart Items
                </h2>
                <ul className="space-y-2 overflow-x-auto overflow-y-scroll pt-2 md:max-h-[360px]">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 border-b pb-2"
                    >
                      <div className="relative">
                        <Image
                          src={
                            item?.image ||
                            "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20fill='%23fff'%3E%3Cpath%20fill-rule='evenodd'%20d='M8%208.5V1a1%201%200%200%200-2%200v7.5H1a1%201%200%200%200%200%202h5.5V15a1%201%200%200%200%202%200v-5.5H15a1%201%200%200%200%200-2h-5.5z'%2F%3E%3C%2Fsvg%3E"
                          }
                          alt={item?.name}
                          width={60}
                          height={60}
                          className="bg-primary-200 size-14 rounded-md"
                        />
                        <div className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 text-xs text-white">
                          {item.quantity}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <p className="text-primary-600 text-sm">
                          ৳{item.price * item.quantity}
                        </p>
                      </div>
                      {/* <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
                        <div className="flex w-fit items-center rounded-md border">
                          <Button
                            size="sm"
                            type="button"
                            variant="ghost"
                            className="p-1.5 text-xs md:text-sm"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                          >
                            <Minus size={14} />
                          </Button>
                          <Input
                            value={item.quantity}
                            className="h-full w-12 rounded-none border-x border-y-0 text-center"
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Number.parseInt(e.target.value) || 1,
                              )
                            }
                          />
                          <Button
                            type="button"
                            className="p-1.5 text-xs md:text-sm"
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="link"
                          className="text-xs text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} />{" "}
                        </Button>
                      </div> */}
                    </li>
                  ))}
                </ul>
                <h2 className="flex items-center text-xl font-semibold md:text-2xl">
                  <Wallet2 className="mr-2" /> Order Summary
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>৳{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {form.watch("shipping") === "Inside Dhaka"
                        ? "৳80.00"
                        : "৳120.00"}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ৳
                      {(
                        calculateTotal() +
                        (form.watch("shipping") === "Inside Dhaka" ? 80 : 120)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  disabled={processing}
                  className="mt-3 mb-10 block w-full md:hidden md:text-lg"
                >
                  {processing
                    ? "Processing..."
                    : form.getValues("paymentMethod") === "online"
                      ? "Pay Now"
                      : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
