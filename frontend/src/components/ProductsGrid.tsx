import React from "react";
import Image from "next/image";
import { ProductListType } from "../types/common.types";
const ProductsGrid = ({
  backImage,
  frontImage,
  heading,
  price,
  detail,
}: ProductListType) => {
  return (
    <div className="w-full min-h-120 p-7">
      <div>
        <h1 className="font-heading font-semibold text-5xl ">
          {heading}
        </h1>
      </div>
      <div className="flex ">
        <div className="w-full h-full">
          <div className="w-70 h-full  p-2">
            <div className="relative w-70 h-80 overflow-hidden group">
              <Image
                className="absolute inset-0 w-full h-full object-cover 
               transition-opacity duration-500 
               group-hover:opacity-0"
                src={frontImage}
                width={1000}
                height={1000}
                alt="Men"
              />
              <Image
                className="absolute inset-0 w-full h-full object-cover 
               opacity-0 transition-opacity duration-500 
               group-hover:opacity-100"
                src={backImage}
                width={1000}
                height={1000}
                alt="Men - alternate"
              />
            </div>
            <div className="flex flex-col ">
              <div className=" w-full flex items-center gap-2 h-10">
                <div className="bg-pink-500 w-7 h-7 rounded-full"></div>
                <div className="bg-pink-500 w-7 h-7 rounded-full"></div>
                <div className="bg-pink-500 w-7 h-7 rounded-full"></div>
              </div>
              <p className="font-body flex items-center pt-2 font-semibold">
                {detail}
              </p>
              <p className="flex pt-1.5 font-body font-semibold items-center">
               Rs.{price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
