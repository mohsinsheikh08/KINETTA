"use client";

import { useState, useEffect } from "react";
import { UserRound, Heart, Handbag, Search } from "lucide-react";
import Image from "next/image";
import useProduct from "@/src/hooks/useProduct";
import Link from "next/link";
const DekstopNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { isOpen, setIsOpen, isWomenOpen, setIsWomenOpen } = useProduct();
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
            <Link href="/mens">
            <span
              className="hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsWomenOpen(false);
              }}
            >
              MEN
            </span>
            </Link>
          </li>

          <li className="relative group">
            <Link href="/womens">
              <span
                onClick={() => {
                  setIsOpen(false);
                  setIsWomenOpen(!isWomenOpen);
                }}
                className="hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block"
              >
                Women
              </span>
            </Link>
          </li>
         <Link href="/shop">
          <li
            onClick={() => {
              setIsOpen(false);
              setIsWomenOpen(false);
            }}
            className="hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block"
          >
            SHOP
          </li></Link>
          <li
            onClick={() => {
              setIsOpen(false);
              setIsWomenOpen(false);
            }}
            className="hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer uppercase pb-1 inline-block"
          >
            New Arrivals
          </li>
          <li>
            <Search
              className="w-5 h-5 sm:w-6 sm:h-6 hover:text-[#282D31] hover:border-black 
                 transition duration-150 
                   cursor-pointer pb-1 inline-block cursor-pointer transition"
            />
          </li>
        </ul>

        <Link href="/">
          <Image
            className="w-24 sm:w-28 md:w-32 h-auto"
            src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
            width={100}
            height={100}
            alt="KinettaText"
            priority
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          <UserRound
            className="w-5 h-5 hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block sm:w-6 sm:h-6 cursor-pointer hover:text-[#282D31] transition"
          />
          <Heart
            className="w-5 h-5 sm:w-6 sm:h-6 hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block cursor-pointer hover:text-[#282D31] transition"
          />
          <Handbag
            className="w-5 h-5 sm:w-6 sm:h-6 hover:text-[#282D31] hover:border-b-2 hover:border-black 
                     border-b-2 border-transparent transition duration-150 
                     cursor-pointer pb-1 inline-block cursor-pointer hover:text-[#282D31] transition"
          />
        </div>
      </nav>

 
    </div>
  );
};

export default DekstopNavbar;
