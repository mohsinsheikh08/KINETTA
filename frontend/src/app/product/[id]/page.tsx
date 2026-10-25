"use client";
import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
import useProduct from "@/src/hooks/useProduct";
import { useParams } from "next/navigation";
import { useEffect,} from "react";
const ProductDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const { getProduct, currentProduct } = useProduct();
 useEffect(() => {
   console.log(currentProduct)
 }, [currentProduct])
 useEffect(() => {
  if (id) {
      getProduct(id);
  }else{
    alert("Product is not available yet!")
  }
 }, [id])
 
  return <div >
    <DekstopNavbar />
    <MobileSidebar />
    <Navbar />
    <div className="md:pt-20 pt-5 md:pl-10 pl-4">
        <p>{currentProduct?.productDescription}</p>
    </div>
  </div>;
};

export default ProductDetail;
