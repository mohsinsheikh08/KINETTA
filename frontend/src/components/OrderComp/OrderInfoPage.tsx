"use client";

import React, { useState, useEffect } from "react";
import useCart from "@/src/hooks/useCart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ChevronLeft } from "lucide-react";

import Image from "next/image";
import useOrder from "@/src/hooks/useOrder";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const labelClass =
  "text-[11px] font-bold text-neutral-600 uppercase tracking-wider";
const inputClass =
  "w-full min-w-0 border border-black/20 bg-white p-3 text-base sm:text-sm focus:outline-none focus:border-black transition-colors";

const OrderInfoPage = () => {
      const { cart, getCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOrder } = useOrder();
  const [formData, setFormData] = useState({
    number: "",
    emergencyNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  useEffect(() => {
    getCart();
  }, []);

  const validItems = cart?.items?.filter((item) => item.product) || [];

  if (!cart || validItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f5] px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-medium mb-4">
          Your cart is empty
        </h2>
        <Link
          href="/shop"
          className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  const subtotal = validItems.reduce(
    (total: number, item) => total + (item.product?.price || 0) * item.quantity,
    0,
  );
  const actualPrice = validItems.reduce(
    (total: number, item) =>
      total + (item.product?.finalPrice || 0) * item.quantity,
    0,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Backend ke format mein data tayyar karo
      const orderData = {
        items: validItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.product.finalPrice, 
        })),
        totalAmount: actualPrice,
        number: formData.number,
        emergencyNumber: formData.emergencyNumber,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: "Pakistan",
        },
        notes: formData.notes,
      };

      await createOrder(orderData);
      alert("Order Placed Successfully!");

      router.push('/success-page')
    } catch (error) {
      console.error("Order Failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
         <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 py-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-black mb-4 sm:mb-8 transition-colors"
        >
          <ChevronLeft size={16} /> Return to Cart
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading tracking-[-0.04em] mb-6 sm:mb-10">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12"
        >
          <div className="w-full min-w-0 lg:w-[60%]">
            <div className="bg-white p-4 sm:p-6 lg:p-8 border border-black/10 shadow-sm">
              <h2 className="text-base sm:text-lg font-medium uppercase tracking-widest mb-4 sm:mb-6 border-b border-black/10 pb-4">
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="number" className={labelClass}>
                    Phone Number *
                  </label>
                  <input
                    id="number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    name="number"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="03XX XXXXXXX"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="emergencyNumber" className={labelClass}>
                    Emergency Number
                  </label>
                  <input
                    id="emergencyNumber"
                    type="tel"
                    inputMode="tel"
                    name="emergencyNumber"
                    value={formData.emergencyNumber}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="street" className={labelClass}>
                    Street Address *
                  </label>
                  <input
                    id="street"
                    type="text"
                    autoComplete="street-address"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="House/Apartment, Street, Area"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className={labelClass}>
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    autoComplete="address-level2"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Karachi"
                  />
                </div>

                {/* State */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="state" className={labelClass}>
                    State/Province *
                  </label>
                  <input
                    id="state"
                    type="text"
                    autoComplete="address-level1"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Sindh"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="postalCode" className={labelClass}>
                    Postal Code *
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="75500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value="Pakistan"
                    disabled
                    className="w-full min-w-0 border border-black/10 bg-neutral-50 p-3 text-base sm:text-sm text-neutral-500 cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="notes" className={labelClass}>
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Any special instructions for delivery..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full min-w-0 lg:w-[40%]">
            {/* sticky only on desktop, otherwise it overlaps when stacked */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 border border-black/10 shadow-sm lg:sticky lg:top-8">
              <h2 className="text-base sm:text-lg font-medium uppercase tracking-widest mb-4 sm:mb-6 border-b border-black/10 pb-4">
                Your Order
              </h2>

              {/* Items List */}
              <div className="mb-6 space-y-4 pr-1 lg:max-h-60 lg:overflow-y-auto lg:pr-2">
                {validItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="relative h-12 w-10 md:h-16 md:w-12 shrink-0 overflow-hidden bg-[#f2f2f0] border border-black/5">
                        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-black text-[9px] md:text-[10px] font-bold text-white shadow-sm z-10">
                          {item.quantity}
                        </span>
                        <Image
                          src={item.product.thumbnail}
                          alt={item.product.productName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <span className="min-w-0 break-words font-medium">
                        {item.product.productName}
                      </span>
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-medium">
                      {formatPrice(item.product.finalPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-black/10 pt-5 text-sm text-neutral-600 sm:space-y-4 sm:pt-6">
                <div className="flex items-center justify-between gap-3">
                  <span>Subtotal</span>
                  <span className="font-medium text-black">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Payment Method</span>
                  <span className="font-medium text-black text-right">
                    Cash on Delivery
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/10 pt-5 sm:mt-6 sm:pt-6">
                <span className="text-sm sm:text-base font-medium uppercase tracking-[0.12em]">
                  Total
                </span>
                <span className="text-xl sm:text-2xl font-semibold tracking-[-0.04em]">
                  {formatPrice(actualPrice)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => {}}
                className={`mt-6 sm:mt-8 w-full min-h-[52px] flex items-center justify-center gap-3 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.28em] text-white transition-all duration-300
                  ${isSubmitting ? "bg-neutral-400 cursor-not-allowed" : "bg-black hover:bg-neutral-800"}`}
              >
                {isSubmitting ? "Processing..." : "Place Order (COD)"}
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500 sm:mt-6">
                <ShieldCheck size={14} /> Secure Checkout
              </div>
            </div>
          </div>
        </form>
      </div>
  )
}

export default OrderInfoPage