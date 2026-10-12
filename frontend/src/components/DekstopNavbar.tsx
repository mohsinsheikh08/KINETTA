"use client";

import { useState, useEffect } from "react";
import { UserRound, Heart, Handbag } from "lucide-react";
import Image from "next/image";
import Video from "./Video";

const DekstopNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden md:flex">
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 
                w-[95%] max-w-7xl 
                px-4 sm:px-6 
                h-14 sm:h-12 
                flex items-center justify-between 
                bg-white/70 backdrop-blur-md 
                rounded-xl sm:rounded-2xl 
                border border-white/20 
                shadow-lg
                transition-transform duration-300
                ${isVisible ? "translate-y-0" : "-translate-y-32"}`}
      >
        <ul className="hidden md:flex items-center gap-6 font-semibold text-sm uppercase tracking-wider">
          <li className="relative group">
            <span
              className="hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block"
            >
              MEN
            </span>
            <div
              className="absolute left-0 top-full pt-4 
                    opacity-0 invisible bg-white w-60 h-60 p-5
                    group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 z-50"
            >
              <h3 className="font-bold text-lg mb-4">Men&apos;s Collection</h3>
              <ul className="space-y-2 text-sm normal-case font-body">
                <li className="hover:text-[#282D31] cursor-pointer">
                  T-Shirts
                </li>
                <li className="hover:text-[#282D31] cursor-pointer">Hoodies</li>
                <li className="hover:text-[#282D31] cursor-pointer">Shorts</li>
                <li className="hover:text-[#282D31] cursor-pointer">Joggers</li>
              </ul>
            </div>
          </li>

          <li className="relative group">
            <span
              className="hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block"
            >
              Women
            </span>
            <div
              className="absolute left-0 top-full pt-4 
                    opacity-0 invisible bg-white w-60 h-60 p-5
                    group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 z-50"
            >
              <h3 className="font-bold text-lg mb-4">Women&apos;s Collection</h3>
              <ul className="space-y-2 text-sm normal-case font-body">
                <li className="hover:text-[#282D31] cursor-pointer">
                  T-Shirts
                </li>
                <li className="hover:text-[#282D31] cursor-pointer">Hoodies</li>
                <li className="hover:text-[#282D31] cursor-pointer">Shorts</li>
                <li className="hover:text-[#282D31] cursor-pointer">Joggers</li>
              </ul>
            </div>
          </li>
          <li className="hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block">
            SHOP
          </li>
          <div className="h-100 w-100 absolute left-0 top-12 rounded-md group-hover:opacity-100 opacity-0 bg-white">
            shop
          </div>
        </ul>

        <Image
          className="w-24 sm:w-28 md:w-32 h-auto"
          src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
          width={100}
          height={100}
          alt="KinettaText"
          priority
        />

        <div className="flex items-center gap-4 sm:gap-5">
          <UserRound className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-[#282D31] transition" />
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-[#282D31] transition" />
          <Handbag className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-[#282D31] transition" />
        </div>
      </nav>

      <div className="relative w-full h-[80vh] sm:h-screen overflow-hidden">
        <Video
          posterSrc="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/men_landing_page_image.jpg?updatedAt=1791542499393"
          videoSrc="https://res.cloudinary.com/epkrapga/video/upload/v1791545885/MenVideoGymWearMobile.mp4"
          mainHeading="MEN'S COLLECTION"
          secondHeading="Engineered for Performance"
        />
      </div>
    </div>
  );
};

export default DekstopNavbar;
