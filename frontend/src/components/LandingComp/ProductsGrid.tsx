"use client";

import Image from "next/image";
import { ProductListType } from "@/src/types/common.types";
import useProduct from "@/src/hooks/useProduct";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProductsGrid = ({
  backImage,
  frontImage,
  id,
  price,
  detail,
}: ProductListType) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(backImage);
  }, [backImage]);

  const { setIsOpen, setIsWomenOpen } = useProduct();

  return (
    <div
      key={id}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        setIsOpen(false);
        setIsWomenOpen(false);
      }}
      className="w-full min-h-120 p-7"
    >
      <div className="flex pt-5">
        <div className="w-full h-full">
          <div className="w-70 h-full p-2">
            <Link href={`product/${id}`}>
              <div className="relative w-60 cursosr-pointer h-80 overflow-hidden">
                <Image
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: isHovered ? 0 : 1 }}
                  src={frontImage}
                  width={1000}
                  height={1000}
                  alt="Product"
                />

                <Image
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: isHovered ? 1 : 0 }}
                  src={backImage}
                  width={1000}
                  height={1000}
                  alt="Product - alternate"
                />
              </div>
            </Link>

            <div className="flex pt-2 flex-col">
              <p className="font-body flex items-center pt-2 font-semibold">
                {detail}
              </p>
              <p className="flex pt-2 font-body font-semibold items-center">
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
