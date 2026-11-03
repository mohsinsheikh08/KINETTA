"use client";
import { useEffect } from "react";
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
  const { getAllProducts, products } = useProduct();

  useEffect(() => {
    const getProducts = async () => {
      await getAllProducts();
    };
    getProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const productArray = Array.isArray(products) ? products : [];
  const mensSection = productArray.filter(
    (men) => men.category?.toLowerCase() === "men"
  );
  const womenSection = productArray.filter(
    (women) => women.category?.toLowerCase() === "women"
  );

  return (

    <div className="w-full min-h-screen overflow-x-hidden flex flex-col bg-white">
      <MobileSidebar />

      <Navbar />

      <DekstopNavbar />

      <main className="flex-1 w-full">
        <section className="w-full flex flex-col items-center md:items-start">
          <div className="block md:hidden w-full">
            <Video
              posterSrc="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/men_landing_page_image.jpg?updatedAt=1791542499393"
              videoSrc="https://res.cloudinary.com/epkrapga/video/upload/v1791545885/MenVideoGymWearMobile.mp4"
              mainHeading="MEN'S COLLECTION"
              secondHeading="Engineered for Performance"
              link="/mens"
            />
          </div>

          <div className="hidden md:block w-full">
            <Video
              posterSrc="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/men_landing_page_image.jpg?updatedAt=1791542499393"
              videoSrc="https://res.cloudinary.com/epkrapga/video/upload/v1791545885/MenVideoGymWearMobile.mp4"
              mainHeading="MEN'S COLLECTION"
              secondHeading="Engineered for Performance"
              link="/mens"
            />
          </div>

          <h1 className="font-heading font-semibold text-2xl sm:text-4xl lg:text-5xl pt-7 px-4 sm:px-7">
            MEN&apos;S COLLECTION
          </h1>

          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6 p-4 sm:p-7">
            {mensSection.length > 0 ? (
              mensSection.map((men) => (
                <ProductsGrid
                  key={men.id}
                  id={men.id}
                  backImage={men?.images?.[1] || men.thumbnail}
                  frontImage={men.thumbnail}
                  price={Number(men.price)}
                  detail={men.productName}
                />
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-gray-500">
                No products found
              </p>
            )}
          </div>
        </section>

        <section className="w-full ">
          <WomenVideo />
        </section>

        <section className="w-full flex flex-col items-center md:items-start">
          <h1 className="font-heading font-semibold text-2xl sm:text-4xl lg:text-5xl pt-7 px-4 sm:px-7">
            WOMEN&apos;S COLLECTION
          </h1>

          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6 p-4 sm:p-7">
            {womenSection.length > 0 ? (
              womenSection.map((women) => (
                <ProductsGrid
                  key={women.id}
                  id={women.id}
                  backImage={women?.images?.[1] || women.thumbnail}
                  frontImage={women.thumbnail}
                  price={Number(women.price)}
                  detail={women.productName}
                />
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-gray-500">
                No products found
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;