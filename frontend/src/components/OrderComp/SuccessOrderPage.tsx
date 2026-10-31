"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";
import confetti from "canvas-confetti";

const SuccessOrderPage = () => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#000000", "#333333", "#666666"],
      });
    } catch (e) {
      console.log("Confetti not installed");
    }
  }, []);
  return (
    <div className="max-w-md w-full bg-white border border-black/10 p-8 md:p-12 shadow-sm text-center">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 bg-black rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-white" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-medium tracking-[-0.04em] text-black mb-4 uppercase">
        Order Confirmed
      </h1>

      <p className="text-neutral-500 text-sm leading-relaxed mb-8">
        Thank you for shopping with KINETTA. Your order has been placed
        successfully. You will receive an email confirmation shortly with your
        order details and tracking information.
      </p>

      <div className="bg-[#f7f7f5] border border-black/5 p-5 mb-8 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <Package size={20} className="text-neutral-500" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
              Delivery Method
            </p>
            <p className="text-sm font-medium text-black">Cash on Delivery</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
            Status
          </p>
          <p className="text-sm font-medium text-green-600">Processing</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/shop"
          className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
        >
          Continue Shopping
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/"
          className="w-full px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 hover:text-black transition-all duration-300 underline underline-offset-4"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessOrderPage;
