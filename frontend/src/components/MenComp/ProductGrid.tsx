"use client";
import useProduct from "@/src/hooks/useProduct";
import { Product } from "@/src/types/product.types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "../LandingComp/Loading";
import { Heart } from "lucide-react";
import { categoryType } from "@/src/types/common.types";
const ProductGrid = ({ category, heading }: categoryType) => {
  const [Products, setProducts] = useState<Product[]>([]);
  const { getAllProducts, loading } = useProduct();

  useEffect(() => {
    const handleProducts = async () => {
      const response: Product[] = await getAllProducts();
      setProducts(response);
    };
    handleProducts();
  }, []);
  const Mens = Products.filter((product) => product.category === category);

  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-heading md:pt-20 pt-5 md:pl-10 pl-4 font-semibold  text-3xl sm:text-4xl leading-15 md:text-6xl lg:7xl">
        {heading}
      </h1>
      {!loading ? (
        <div className="w-full  grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-2 p-4">
          {Mens.map((product) => {
            return (
              <div key={product._id} className="h-140">
                <div className="relative w-full group aspect-[4/5] bg-gray-50 overflow-hidden group cursor-pointer">
                  <div>
                    <div>
                      <Image
                        className="object-cover blur-xl scale-110 opacity-30 absolute inset-0 group-hover:opacity-0"
                        fill
                        src={product.thumbnail}
                        alt=""
                      />

                      <Image
                        className="object-cover blur-xl scale-110 opacity-30 absolute inset-0 group-hover:opacity-100"
                        fill
                        src={product.thumbnail}
                        alt=""
                      />
                    </div>

                    <div className="absolute inset-0 p-2">
                      <div className="relative w-full h-full">
                        <Image
                          className="object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={product.thumbnail}
                          alt={product.productName}
                        />
                      </div>
                    </div>

                    <div className="absolute inset-0 p-2">
                      <div className="relative w-full h-full">
                        <Image
                          className="object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                          fill
                          src={product?.images?.[1] || product.thumbnail}
                          alt={product.productName}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-3 flex flex-col gap-3 px-1">
                  {/* 1. Colors Section */}
                  <div className="flex items-center gap-2">
                    {product.colors?.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* 2. Product Name and Heart Icon Section */}
                  <div className="flex justify-between items-start gap-2">
                    {/* Product Name */}
                    <p className="text-[13px] md:text-[16px] font-medium text-gray-900 tracking-wide truncate">
                      {product.productName}
                    </p>

                    {/* Heart Icon (Wishlist) */}
                    <button className="text-gray-400 hover:text-black transition-colors duration-300">
                      <Heart size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* 3. Price Section (Next Line) */}
                  <div className="flex items-center">
                    <p className="text-[13px] md:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Rs. {product.price?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductGrid;
