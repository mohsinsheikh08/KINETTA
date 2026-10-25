"use client";
import useProduct from "@/src/hooks/useProduct";
import { Product } from "@/src/types/product.types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Men from "@/public/Man_standing_in_studio_2K_20261012145115.jpg";
import Women from "@/public/Woman_posing_in_athletic_wear_2K_20261009000152.jpg"
import Loading from "../LandingComp/Loading";
const ProductGrid = () => {
  const [Products, setProducts] = useState<Product[]>([]);
  const { getAllProducts, loading } = useProduct();
  
  useEffect(() => {
    const handleProducts = async () => {
      const response: Product[] = await getAllProducts();
      setProducts(response);
    };
    handleProducts();
  }, []);
  if(loading){
    return <Loading />
  }

  const Mens = Products.filter((product) => product.category === "Men");
  console.log(Mens);
  return (
    <div className="w-full grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3  gap-2 ">
       {Products.map((product) => {
        return       <div key={product._id} className="h-150">
        <div className="w-full flex justify-center">
          <div>
            <Image
            className="w-full h-130  object-contain "
            width={500}
            height={500}
            src={product.thumbnail}
            alt={product.productName}
          />
          </div>
        </div>
      </div>
      })} 

    
    </div>
  );
};

export default ProductGrid;
