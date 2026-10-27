"use client"; // Next.js client component
import React, { useEffect } from "react";
import useProduct from "@/src/hooks/useProduct";
import Image from "next/image";
import useReview from "@/src/hooks/useReview";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import Star from "@/public/star.png";

const ProductPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { currentProduct } = useProduct();
  const { getProductReviews, review } = useReview();
  console.log(review);
  useEffect(() => {
    console.log(id);
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
    <div className="md:pt-20 pt-5 flex flex-col w-full max-w-7xl mx-auto gap-4">
      <div className="flex">
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
              <div className="flex font-semibold font-body justify-between gap-1 items-center  ">
                <span>
                  {" "}
                  <Image className="w-4 " src={Star} alt="Star" />
                </span>
                <span>
                  {" "}
                  <p className="pt-[1px]">{review?.averageRating || 0}</p>
                </span>
                <span>
                  {" "}
                  <p>({review?.count || 0})</p>
                </span>
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
      <div className="w-full  mx-auto p-5 md:p-10 border-t border-gray-200 mt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-semibold text-3xl md:text-4xl uppercase tracking-wider">
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

                {/* Comment Text */}
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
