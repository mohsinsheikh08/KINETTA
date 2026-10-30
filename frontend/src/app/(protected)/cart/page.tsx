"use client";

import React, { useEffect } from "react";
import useCart from "@/src/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";
import Loading from "@/src/components/LandingComp/Loading";
import Empty from "@/src/components/LandingComp/Empty";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

const CartPage = () => {
  const { cart, loading, getCart, updateCart, deleteProductInCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  if (loading) return <Loading />;

  const validItems =
    cart?.items?.filter((item) => item.product && item.product !== null) || [];
  if (!cart || validItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f5] px-4">
        <div className="flex flex-col items-center justify-center">
          <Empty />
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center bg-black text-white px-8 py-3 text-[11px] md:text-xs font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:bg-neutral-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const taxAmount =  validItems.reduce(
    (add, acc) => add + acc.product.taxAmount,
    0,
  );
  const discount = validItems.reduce(
    (add, acc) => add + acc.product.discount,
    0,
  );
  const actualPrice = validItems.reduce(
    (add, acc) => add + acc.product.finalPrice,
    0,
  );
  const subtotal = validItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  const itemCount = validItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen  text-black">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16 lg:py-20">
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500">
              Luxury Essentials
            </p>
            <h1 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl">
              Shopping Bag
            </h1>
          </div>

          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <ShoppingBag size={16} />
            <span>
              {itemCount} item{itemCount > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="w-full lg:w-[62%]">
            <div className="space-y-4">
              {validItems.map((item) => (
                <article
                  key={`${item.product?._id}-${item.size}-${item.color}`}
                  className="group overflow-hidden border border-black/10 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
                >
                  <div className=" gap-5  p-4 flex flex-row md:p-6">
                    <Link
                      href={`/product/${item.product?._id}`}
                      className="relative block md:h-52 w-full overflow-hidden aspect-[4/5] bg-[#f2f2f0] md:h-60 md:w-52"
                    >
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </Link>

                    <div className="flex w-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                            Signature
                          </p>
                          <Link
                            href={`/product/${item.product?._id}`}
                            className="block text-lg font-medium tracking-[0.02em] transition-colors hover:text-neutral-600"
                          >
                            {item.product.productName}
                          </Link>

                          <p className="mt-2 text-sm text-neutral-600">
                            Size: {item.size} | Color:{" "}
                            <span className="capitalize">{item.color}</span>
                          </p>
                        </div>

                        <p className="whitespace-nowrap text-base font-medium md:text-lg">
                          {formatPrice(item.product.finalPrice)}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
                        <div className="inline-flex items-center border border-black/15 ">
                          <button
                            onClick={() =>
                              updateCart({
                                quantity: item.quantity - 1,
                                product: item.product._id,
                                color: item.color,
                                size: item.size,
                              })
                            }
                            disabled={item.quantity <= 1}
                            className={`flex h-10 w-10 items-center justify-center transition-colors ${
                              item.quantity <= 1
                                ? "cursor-not-allowed text-neutral-300"
                                : "text-neutral-700 hover:bg-black hover:text-white"
                            }`}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="min-w-[48px] text-center text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateCart({
                                quantity: item.quantity + 1,
                                product: item.product._id,
                                color: item.color,
                                size: item.size,
                              })
                            }
                            disabled={item.quantity >= item.product.stock}
                            className={`flex h-10 w-10 items-center justify-center transition-colors ${
                              item.quantity >= item.product.stock
                                ? "cursor-not-allowed text-neutral-300"
                                : "text-neutral-700 hover:bg-black hover:text-white"
                            }`}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => deleteProductInCart(item.product._id)}
                          className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 transition-colors hover:text-red-500"
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="w-full lg:w-[38%]">
            <div className="sticky top-8 border border-black/10 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] md:p-8">
              <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500">
                Order Summary
              </p>

              <div className="space-y-4 border-b border-black/10 pb-6 text-sm text-neutral-600">
                <div className="flex items-center justify-between">
                  <span>Price</span>
                  <span className="font-medium text-black">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <span>{discount}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>{taxAmount}%</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-base font-medium uppercase tracking-[0.12em]">
                  Total
                </span>
                <span className="text-2xl font-semibold tracking-[-0.04em]">
                  {formatPrice(actualPrice)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-black px-5 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-neutral-800"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>

              <div className="mt-6 border-t border-black/10 pt-5 text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  Cash on Delivery Available
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
