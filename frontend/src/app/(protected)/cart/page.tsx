"use client";
import React, { useEffect } from "react";
import useCart from "@/src/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, Minus, Plus } from "lucide-react";
import Loading from "@/src/components/LandingComp/Loading";
import Empty from "@/src/components/LandingComp/Empty";

const CartPage = () => {
  const { cart, loading, getCart, updateCart, deleteProductInCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  if (loading) return <Loading />;

  // 1. Filter out items where product is null (Data error se bachne ke liye)
  const validItems = cart?.items?.filter((item) => item.product !== null) || [];

  if (!cart || validItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Empty />
        <Link
          href="/shop"
          className="mt-6 bg-black text-white px-8 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // 2. Subtotal calculate karo (Kyunki backend se totalPrice nahi aa raha)
  const subtotal = validItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20 mt-10 md:mt-0">
      <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-8 tracking-wide">
        Shopping Bag
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* LEFT SIDE: Cart Items List */}
        <div className="w-full lg:w-[60%] flex flex-col border-t border-gray-200">
          {validItems.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 md:gap-6 py-6 border-b border-gray-200"
            >
              {/* Product Image */}
              <Link
                href={`/product/${item.product._id}`} // <-- _id use karo
                className="relative w-24 h-32 md:w-32 md:h-40 bg-gray-50 shrink-0"
              >
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.productName}
                  fill
                  className="object-cover"
                />
              </Link>

              {/* Product Details */}
              <div className="flex flex-col justify-between w-full">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base uppercase tracking-wide">
                        {item.product.productName}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm mt-1">
                        Size: {item.size} | Color:{" "}
                        <span className="capitalize">{item.color}</span>
                      </p>
                    </div>
                    {/* Price */}
                    <p className="font-semibold text-sm md:text-base">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Quantity & Remove */}
                <div className="flex justify-between items-center mt-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        updateCart({
                          quantity: item.quantity - 1,
                          product: item.product._id, // <-- Sirf _id bhejo
                          color: item.color,
                          size: item.size,
                        })
                      }
                      disabled={item.quantity <= 1}
                      className={`p-2 ${item.quantity <= 1 ? "text-gray-300" : "text-gray-500 hover:text-black"}`}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCart({
                          quantity: item.quantity + 1,
                          product: item.product._id, // <-- Sirf _id bhejo
                          color: item.color,
                          size: item.size,
                        })
                      }
                      disabled={item.quantity >= item.product.stock}
                      className={`p-2 ${item.quantity >= item.product.stock ? "text-gray-300" : "text-gray-500 hover:text-black"}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => deleteProductInCart(item.product._id)} // <-- _id bhejo
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs uppercase"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-gray-50 p-6 md:p-8 sticky top-24">
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-6">
              Order Summary
            </h2>

            <div className="flex flex-col gap-4 text-sm text-gray-600 border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-black">
                  Rs. {subtotal.toLocaleString()} {/* Subtotal calculated */}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold uppercase">Total</span>
              <span className="font-bold text-xl">
                Rs. {subtotal.toLocaleString()} {/* Total mein bhi subtotal use karo */}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-black text-white py-4 flex items-center justify-center gap-2 uppercase tracking-widest text-sm font-semibold hover:bg-gray-900 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <p className="text-center text-xs text-gray-500 mt-4">
              Cash on Delivery Available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;