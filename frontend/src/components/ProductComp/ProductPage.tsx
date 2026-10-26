"use client"; // Next.js client component
import React from "react";
import useProduct from "@/src/hooks/useProduct";
import Image from "next/image";

const ProductPage = () => {
  const { currentProduct } = useProduct();

  if (!currentProduct) {
    return <div className="text-center mt-20 text-xl">Loading product...</div>;
  }
  const productDate = new Date(currentProduct.createdAt).getTime();
  const today = new Date().getTime();
  const difference = today - productDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.floor(difference / oneDay);
  const days = daysDifference <= 7;
  console.log(days);
  return (
    <div className="md:pt-20 pt-5 flex w-full max-w-7xl mx-auto gap-4">
      <aside className="scrollbar-none hidden min-[900px]:flex relative w-[50%]  overflow-y-auto  flex-col gap-2 h-screen p-2">
        {currentProduct.images.map((imgUrl, idx) => {
          return (
            <div
              key={idx}
              className="relative w-full aspect-[4/5] bg-gray-50 shrink-0"
            >
              <Image
                className="object-cover"
                src={imgUrl}
                alt={`${currentProduct.productName} - ${idx + 1}`}
                fill
                priority={idx === 0}
                unoptimized
              />
            </div>
          );
        })}
      </aside>
      {/* <aside className="w-[50%] p-20">
        {days ? <p>New</p> : ""}
        <h1 className="text-3xl font-semibold">{currentProduct.productName}</h1>
        <p className="text-xl mt-2 font-medium">Rs. {currentProduct.price}</p>
      </aside> */}
    </div>
  );
};

export default ProductPage;
