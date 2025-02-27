"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-provider";
import {
  Minus,
  MoveLeft,
  Plus,
  ShoppingBag,
  Trash2,
  Wallet2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const form = useForm({
    defaultValues: {
      shipping: "Inside Dhaka", // Default shipping method
    },
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="my-4 h-full min-h-[60vh]">
      {/* <h1 className="text-primary-800 mb-4 text-center text-3xl font-bold md:mb-6">
        My Cart
      </h1> */}

      {cart.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="relative mb-6">
              <div className="bg-primary/50 absolute inset-0 scale-[1.8] rounded-full opacity-50 blur-xl" />
              <div className="bg-background relative rounded-full p-6">
                <ShoppingBag
                  className="mx-auto size-16 md:size-20"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-sm">
              Looks like you haven&apos;t added anything to your cart yet.
              Explore our products and find something you&apos;ll love!
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/products">
                  <MoveLeft className="size-4" />
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild variant="outlineSecondary" size="lg">
                <Link href="/products?sort=new">Explore New Arrivals</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 gap-6 px-4 md:my-6 md:gap-8 lg:min-h-[50vh] lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Cart Items */}
            <div className="rounded-lg bg-white p-3 shadow-md md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-start text-2xl font-semibold">
                  <ShoppingBag className="mr-2" /> Items
                </h2>
                <Button
                  onClick={clearCart}
                  variant="destructive"
                  className="flex h-7 gap-1 p-2 text-sm"
                >
                  <X /> Clear Cart
                </Button>
              </div>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item?.id}
                    className="flex flex-col justify-between gap-4 border-b pb-4 last-of-type:border-b-0 last-of-type:pb-0 md:flex-row"
                  >
                    <div className="flex gap-2 md:flex-nowrap md:gap-4">
                      <Image
                        src={
                          item?.image ||
                          "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                        }
                        alt={item?.name}
                        width={60}
                        height={60}
                        className="bg-primary-200 size-16 rounded-md"
                      />
                      <div>
                        <h3 className="text-md font-semibold md:text-base">
                          {item?.name}
                        </h3>
                        <p className="md:text-md text-primary-600 text-sm">
                          TK {item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="flex w-fit rounded-md border">
                        <Button
                          size="sm"
                          type="button"
                          variant="ghost"
                          className="text-xs md:text-sm"
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
                          className="text-xs md:text-sm"
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
                        variant="destructive"
                        className="text-xs"
                        onClick={() => removeFromCart(item?.id)}
                      >
                        <Trash2 size={14} /> Remove
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative h-full">
            <div className="top-20 space-y-8 lg:sticky">
              {/* Order Summary */}
              <div className="rounded-lg bg-white p-3 shadow-md md:p-6">
                <h2 className="mb-4 flex items-center text-2xl font-semibold">
                  <Wallet2 className="mr-2" /> Cart Total
                </h2>
                <div className="space-y-2 font-medium slashed-zero">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>TK {calculateTotal()?.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {form.watch("shipping") === "Inside Dhaka"
                        ? "TK 80.00"
                        : "TK 120.00"}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="Inside Dhaka"
                        checked={form.watch("shipping") === "Inside Dhaka"}
                        onChange={() =>
                          form.setValue("shipping", "Inside Dhaka")
                        }
                        className="form-radio"
                      />
                      <span>Inside Dhaka (TK 80.00)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="Outside Dhaka"
                        checked={form.watch("shipping") === "Outside Dhaka"}
                        onChange={() =>
                          form.setValue("shipping", "Outside Dhaka")
                        }
                        className="form-radio"
                      />
                      <span>Outside Dhaka (TK 120.00)</span>
                    </label>
                  </div>
                  <hr />
                  <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      TK{" "}
                      {(
                        calculateTotal() +
                        (form.watch("shipping") === "Inside Dhaka" ? 80 : 120)
                      )?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <Button className="w-full" asChild>
                <Link
                  href={{
                    pathname: "/checkout",
                    query: { shipping: form.watch("shipping") },
                  }}
                >
                  {/* Proceed to Checkout */}
                  Order Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
