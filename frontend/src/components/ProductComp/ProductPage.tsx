"use client"; // Next.js client component
import React, { useEffect } from "react";
import useProduct from "@/src/hooks/useProduct";
import Image from "next/image";
import useReview from "@/src/hooks/useReview";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import Star from '@/public/star.png'

const ProductPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { currentProduct } = useProduct();
  const { getProductReviews, review } = useReview();
  console.log(review);
  useEffect(() => {
    console.log(id)
    const fetchReviews = async () => {
      await getProductReviews(id);
    };
    if (id) {
      fetchReviews();
    }
  }, [id]);
  if (!currentProduct) {
    return <div className="text-center mt-20 text-xl">Loading product...</div>;
  }
  const productDate = new Date(currentProduct.createdAt).getTime();
  const today = new Date().getTime();
  const difference = today - productDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.floor(difference / oneDay);
  const days = daysDifference <= 7;
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
      <aside className="w-[50%] pt-25 px-25">
        <div className="flex flex-col gap-3">
          {days ? (
            <button className="text-[12px] w-10 font-body font-semibold tracking-wide px-2 py-1 bg-gray-100">
              New
            </button>
          ) : (
            ""
          )}
          <p className="text-3xl font-body font-black">
            {currentProduct.productName}
          </p>
          <p className="font-semibold font-body text-gray-400 text-sm">
            {currentProduct.subCategory}
          </p>
          <div className="flex items-center justify-between">
            <p className="font-bold font-body">
              Rs. {currentProduct.price.toLocaleString()}
            </p>
            <div className="flex">
              <div className="flex font-semibold font-body items-center  ">
                <Image className="w-4 " src={Star} alt="Star"/>
               <div className="flex gap-1 items-center">
                 <p className="pt-[1px]">{review?.averageRating || 0}</p>
                <p>({review?.count || 0})</p>
               </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-[550] font-body text-gray-400 text-sm">
            {currentProduct.productDescription}
          </p>
        </div>
        <div className="pt-6 h-19 w-full flex  justify-between items-center">
          <button className="h-full w-[80%] bg-black text-white">
            Add to bag
          </button>
          <button className="h-full w-[18%] flex justify-center items-center border-gray-200 border-1">
            <Heart />
          </button>
        </div>
      </aside>
    </div>
  );
};

export default ProductPage;
