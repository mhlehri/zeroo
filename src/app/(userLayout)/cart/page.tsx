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
    <div className="my-4">
      {/* <h1 className="text-primary-800 mb-4 text-center text-3xl font-bold md:mb-6">
        My Cart
      </h1> */}

      {cart.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4 lg:min-h-[60vh]">
          <svg
            className="size-32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="" stroke-width="0"></g>
            <g id="" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="" className="*:fill-primary *:last-of-type:fill-white">
              {" "}
              <path d="M8.7351 14.0181C8.91085 13.6985 9.24662 13.5 9.61132 13.5H16.47C17.22 13.5 17.88 13.09 18.22 12.47L21.6008 6.33041C21.7106 6.13097 21.7448 5.91025 21.7129 5.70131C21.8904 5.52082 22 5.27321 22 5C22 4.44772 21.5523 4 21 4H6C5.96703 4 5.93443 4.0016 5.90228 4.00471L5.7317 3.64435C5.40095 2.94557 4.69708 2.5 3.92398 2.5H2.92004C2.36776 2.5 1.92004 2.94772 1.92004 3.5C1.92004 4.05228 2.36776 4.5 2.92004 4.5H3.14518C3.6184 4.5 4.04931 4.77254 4.25211 5.20011L7.08022 11.1627C7.35632 11.7448 7.33509 12.4243 7.02318 12.988L6.17004 14.53C5.44004 15.87 6.40004 17.5 7.92004 17.5H18.92C19.4723 17.5 19.92 17.0523 19.92 16.5C19.92 15.9477 19.4723 15.5 18.92 15.5H9.61131C8.85071 15.5 8.36855 14.6845 8.7351 14.0181Z"></path>{" "}
              <path d="M7.92005 18.5C6.82005 18.5 5.93005 19.4 5.93005 20.5C5.93005 21.6 6.82005 22.5 7.92005 22.5C9.02005 22.5 9.92005 21.6 9.92005 20.5C9.92005 19.4 9.02005 18.5 7.92005 18.5Z"></path>{" "}
              <path d="M17.9201 18.5C16.8201 18.5 15.9301 19.4 15.9301 20.5C15.9301 21.6 16.8201 22.5 17.9201 22.5C19.0201 22.5 19.9201 21.6 19.9201 20.5C19.9201 19.4 19.0201 18.5 17.9201 18.5Z"></path>{" "}
              <path d="M10 7.5H16V9.5H10V7.5Z"></path>{" "}
            </g>
          </svg>
          <p className="text-primary-600 text-2xl lg:text-4xl">
            Cart is empty.
          </p>
          <Button asChild className="flex w-fit items-center">
            <Link href="/products" className="">
              <MoveLeft /> Continue Shopping
            </Link>
          </Button>
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
