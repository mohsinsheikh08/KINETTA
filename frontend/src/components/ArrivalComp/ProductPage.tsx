"use client";
import useProduct from "@/src/hooks/useProduct";
import { Product } from "@/src/types/product.types";
import { useEffect, useState } from "react";
import ProductLoading from "@/src/components/LandingComp/ProductLoading";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Empty from "../LandingComp/Empty";
const ProductPage = () => {
  const { getAllProducts, loading } = useProduct();
  const [Products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const productHandler = async () => {
      const response = await getAllProducts();
      setProducts(response);
    };
    productHandler();
  }, []);
  const today = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const productsUpdate = Products.filter((product) => {
    const productTime = new Date(product.createdAt).getTime();
    const difference = today - productTime;
    const time = Math.floor(difference / oneDay);
    return time <= 7;
  });

  return (
    <div className="flex flex-col gap-12 pb-20 md:pb-10">
      <h1 className="font-heading md:pt-20 pt-5 md:pl-10 pl-4 font-semibold  text-3xl sm:text-4xl leading-15 md:text-6xl lg:7xl">
        Kinetta Arrivals
      </h1>
      {loading ? (
        productsUpdate.length ? (
          <div className="w-full grid grid-cols-1  min-[400px]:grid-cols-2 md:grid-cols-3 min-[400px]:gap-2 p-4">
            {productsUpdate.map((product) => {
              return (
                <div key={product._id} className="h-140 pb-10">
                  <div className="">
                    <Link href={`/product/${product._id}`}>
                      <div className="relative w-full group aspect-[4/5] bg-gray-50 overflow-hidden group cursor-pointer">
                        <div className="pb-10">
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
                    </Link>
                    <div className="w-full mt-3 flex flex-col gap-3 px-1">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-[13px] md:text-[16px] font-medium text-gray-900 tracking-wide truncate">
                          {product.productName}
                        </p>

                        <button className="text-gray-400 hover:text-black transition-colors duration-300">
                          <Heart size={18} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center">
                        <p className="text-[13px] md:text-sm font-semibold text-gray-900 whitespace-nowrap">
                          Rs. {product.price?.toLocaleString() || "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ProductLoading />
        )
      ) : (
        <div className="w-full h-screen  flex items-center ">
          {" "}
          <Empty />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
