"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/LandingComp/Navbar";
import DekstopNavbar from "../components/LandingComp/DekstopNavbar";
import WomenVideo from "../components/LandingComp/WomenVideo";
import ProductsGrid from "../components/LandingComp/ProductsGrid";
import Footer from "../components/LandingComp/Footer";
import Video from "../components/LandingComp/Video";
import useProduct from "../hooks/useProduct";
import { Product } from "../types/product.types";
import MobileSidebar from "../components/LandingComp/MobileSidebar";
const Landing = () => {
  const [AllProducts, setAllProducts] = useState<Product[]>([]);
  const { getAllProducts } = useProduct();
  useEffect(() => {
    const getProducts = async () => {
      const response: Product[] = await getAllProducts();
      setAllProducts(response);
      console.log(response);
    };
    getProducts();
  }, []);

  const mensSection = AllProducts.filter((men) => men.category === "Men");
  const womenSection = AllProducts.filter(
    (women) => women.category === "Women",
  );
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className="w-full h-screen ">
      <MobileSidebar />
      <Navbar />
      <div className="md:hidden">
        <Video
          posterSrc="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/men_landing_page_image.jpg?updatedAt=1791542499393"
          videoSrc="https://res.cloudinary.com/epkrapga/video/upload/v1791545885/MenVideoGymWearMobile.mp4"
          mainHeading="MEN'S COLLECTION"
          secondHeading="Engineered for Performance"
        />
      </div>
      <div>
        <DekstopNavbar />
        <Video
          secondHeading="Engineered for Performance"
          mainHeading="MEN'S COLLECTION"
          posterSrc="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/men_landing_page_image.jpg?updatedAt=1791542499393"
          videoSrc="https://res.cloudinary.com/epkrapga/video/upload/v1791545885/MenVideoGymWearMobile.mp4"
        />
        <h1 className="font-heading font-semibold text-3xl pt-7 pl-7 sm:text-5xl">
          MEN&apos;S COLLECTION
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-7">
          {mensSection.map((men) => {
            return (
              <ProductsGrid
                key={men.id}
                colors={men.colors}
                id={men.id}
                backImage={men?.images[1]}
                frontImage={men.thumbnail}
                price={men.price}
                detail={men.productName}
              />
            );
          })}
        </div>
        <WomenVideo />
        <h1 className="font-heading font-semibold text-3xl pt-7 pl-7 sm:text-5xl">
          WOMEN&apos;S COLLECTION
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {womenSection.map((women) => {
            return (
              <ProductsGrid
                key={women.id}
                id={women.id}
                colors={women.colors}
                backImage={women?.images[1]}
                frontImage={women.thumbnail}
                price={women.price}
                detail={women.productName}
              />
            );
          })}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Landing;
