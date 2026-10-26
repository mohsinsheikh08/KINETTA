"use client";
import DekstopNavbar from "@/src/components/LandingComp/DekstopNavbar";
import MobileSidebar from "@/src/components/LandingComp/MobileSidebar";
import Navbar from "@/src/components/LandingComp/Navbar";
import useProduct from "@/src/hooks/useProduct";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductPage from '@/src/components/ProductComp/ProductPage'
import Footer from "@/src/components/LandingComp/Footer";

const ProductDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const { getProduct, currentProduct, loading } = useProduct();

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  if (loading || !currentProduct) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-2xl">
        Loading Product...
      </div>
    );
  }

  return (
    <div>
      <DekstopNavbar />
      <MobileSidebar />
      <Navbar />
      <ProductPage />
      {/* <Footer /> */}
    </div>
  );
};

export default ProductDetail;
