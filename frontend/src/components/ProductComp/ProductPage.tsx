"use client";
import React, { useEffect, useState } from "react";
import useProduct from "@/src/hooks/useProduct";
import Image from "next/image";
import useReview from "@/src/hooks/useReview";
import { useParams } from "next/navigation";
import { Heart, Plus, Minus } from "lucide-react";
import Star from "@/public/star.png";
import Loading from "../LandingComp/Loading";
import useCart from "@/src/hooks/useCart";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const formatPrice = (value: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(value);
};
const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");
  const params = useParams();
  const id = params.id as string;
  const { createCart, loading, error } = useCart();
  const { currentProduct } = useProduct();
  const { getProductReviews, review } = useReview();
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      await getProductReviews(id);
    };
    if (id) {
      fetchReviews();
    }
  }, [id]);

  if (!currentProduct) {
    return <Loading />;
  }

  const productDate = new Date(currentProduct.createdAt).getTime();
  const today = new Date().getTime();
  const difference = today - productDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.floor(difference / oneDay);
  const days = daysDifference <= 7;

  return (
    <div className="md:pt-20 pt-5 flex flex-col w-full max-w-7xl mx-auto gap-4">
      <div className="flex flex-col lg:flex-row w-full">
        <aside className="scrollbar-none w-full lg:w-[50%] h-auto lg:h-screen overflow-y-auto lg:overflow-x-hidden overflow-x-auto flex flex-row lg:flex-col gap-2 p-2 snap-x snap-mandatory">
          {currentProduct.images.map((imgUrl, idx) => {
            return (
              <div
                key={idx}
                className="relative min-w-[80vw] lg:min-w-full aspect-[4/5] bg-gray-50 shrink-0 snap-center"
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

        <aside className="w-full lg:w-[50%] px-4 md:px-10 lg:px-16 py-6 lg:py-0">
          <div className="flex flex-col gap-3">
            {days && (
              <button className="text-[12px] w-10 font-body font-semibold tracking-wide px-2 py-1 bg-gray-100">
                New
              </button>
            )}
            <p className="text-2xl md:text-3xl font-body font-black">
              {currentProduct.productName}
            </p>
            <p className="font-semibold font-body text-gray-400 text-sm">
              {currentProduct.subCategory}
            </p>
            <div className="flex items-center justify-between">
              <p className="font-bold flex flex-col font-body text-lg">
                {formatPrice(currentProduct?.finalPrice)}
                <span className="font-semibold font-body text-gray-500 text-sm line-through">
                  {formatPrice(currentProduct.price)}
                </span>
              </p>

              <div className="flex font-semibold font-body justify-between gap-1 items-center">
                <Image className="w-4" src={Star} alt="Star" />
                <p className="pt-[1px]">{review?.averageRating || 0}</p>
                <p>({review?.count || 0})</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-[550] font-body text-gray-500 text-sm leading-relaxed">
              {currentProduct.productDescription}
            </p>
          </div>

          <div className="w-full pt-6">
            <p className="text-sm font-body font-bold mb-3 text-gray-800 tracking-wide uppercase">
              Select Size
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {sizes.map((size, idx) => (
                <button
                  onClick={() => setSelectedSize(size)}
                  className={`flex items-center justify-center h-12 border text-sm cursor-pointer transition-all duration-200 
                  ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                  key={idx}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full pt-6">
            <p className="font-body font-bold mb-3 text-gray-800 tracking-wide uppercase">
              Select Color:{" "}
              <span className="text-gray-500 font-normal capitalize">
                {selectedColor}
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              {currentProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                  ${
                    selectedColor === color
                      ? "ring-1 ring-offset-2 ring-black"
                      : "hover:ring-1 hover:ring-gray-300 hover:ring-offset-2"
                  }`}
                >
                  <span
                    className="w-full h-full rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <button
              onClick={() => setCount(count > 1 ? count - 1 : count)}
              className={`${
                count <= 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:border-black"
              } group flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full transition-colors duration-300`}
            >
              <Minus
                size={16}
                className="text-gray-500 group-hover:text-black transition-colors"
              />
            </button>
            <span className="text-lg font-body font-medium text-black w-6 text-center">
              {count}
            </span>
            <button
              onClick={() =>
                setCount(count < currentProduct.stock ? count + 1 : count)
              }
              className={`${
                count >= currentProduct.stock
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:border-black"
              } group flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full transition-colors duration-300`}
            >
              <Plus
                size={16}
                className="text-gray-500 group-hover:text-black transition-colors"
              />
            </button>
          </div>

          <div className="flex h-10 items-center mt-2">
            {error && (
              <p className="text-red-500 transition-all duration-300 ease-in-out">
                {error}
              </p>
            )}
          </div>

          <div className="w-full flex gap-2 justify-between items-center mt-2">
            <button
              onClick={() => {
                createCart({
                  size: selectedSize,
                  quantity: count,
                  color: selectedColor,
                  product: id,
                });
              }}
              className={`h-14 w-[80%] text-white font-medium uppercase tracking-wide transition-colors duration-300 flex items-center justify-center
                ${loading ? "bg-gray-800 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Add to bag"
              )}
            </button>
            <button className="h-14 w-[18%] flex justify-center items-center border border-gray-200 hover:border-black transition-colors">
              <Heart />
            </button>
          </div>
        </aside>
      </div>

      <div className="w-full mx-auto p-5 md:p-10 border-t border-gray-200 mt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-semibold text-2xl md:text-4xl uppercase tracking-wider">
            Customer Reviews
          </h2>
          <span className="text-gray-500 text-sm font-medium">
            ({review?.reviews?.length || 0} Reviews)
          </span>
        </div>

        {review?.reviews?.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {review?.reviews?.map((rev) => (
              <div
                key={rev._id}
                className="flex flex-col gap-3 pb-6 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm uppercase">
                      {rev.user?.firstName?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {rev.user?.firstName} {rev.user?.lastName}
                      </p>
                      <p className="text-xs text-gray-400">Verified Buyer</p>
                    </div>
                  </div>
                  <div className="flex text-black">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < rev.rating ? "opacity-100" : "opacity-30"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-13">
                  {rev.comment || "This user didn't write a comment."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
