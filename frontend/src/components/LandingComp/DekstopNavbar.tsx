"use client";

import { useState, useEffect } from "react";
import { UserRound, Heart, Handbag, Search } from "lucide-react";
import Image from "next/image";
import useProduct from "@/src/hooks/useProduct";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DekstopNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { setIsOpen, setIsWomenOpen } = useProduct();
  const pathname = usePathname();

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

  const getLinkClass = (path: string) => {
    return `hover:text-[#282D31] hover:border-black border-b-2 pb-1 inline-block transition duration-150 cursor-pointer uppercase ${
      pathname === path ? "border-black text-[#282D31]" : "border-transparent"
    }`;
  };

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
        <ul className="hidden md:flex items-center gap-6 font-semibold text-sm tracking-wider">
          {/* MEN */}
          <li className="relative group">
            <Link href="/mens">
              <span
                className={getLinkClass("/mens")}
                onClick={() => {
                  setIsOpen(!setIsOpen); 
                  setIsWomenOpen(false);
                }}
              >
                MEN
              </span>
            </Link>
          </li>

          {/* WOMEN */}
          <li className="relative group">
            <Link href="/womens">
              <span
                onClick={() => {
                  setIsOpen(false);
                  setIsWomenOpen(false);
                }}
                className={getLinkClass("/womens")}
              >
                Women
              </span>
            </Link>
          </li>

          {/* SHOP */}
          <li>
            <Link href="/shop">
              <span
                onClick={() => {
                  setIsOpen(false);
                  setIsWomenOpen(false);
                }}
                className={getLinkClass("/shop")}
              >
                SHOP
              </span>
            </Link>
          </li>

          {/* NEW ARRIVALS */}
          <li>
            <Link href="/new">
              <span
                onClick={() => {
                  setIsOpen(false);
                  setIsWomenOpen(false);
                }}
                className={getLinkClass("/new")}
              >
                New Arrivals
              </span>
            </Link>
          </li>

          {/* SEARCH ICON */}
          <li>
            <Search className="w-5 h-5 sm:w-6 sm:h-6 hover:text-[#282D31] transition duration-150 cursor-pointer pb-1 inline-block" />
          </li>
        </ul>

        {/* LOGO */}
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

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 sm:gap-5">
          <UserRound className="w-5 h-5 sm:w-6 sm:h-6 hover:text-[#282D31] transition duration-150 cursor-pointer pb-1 inline-block" />
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 hover:text-[#282D31] transition duration-150 cursor-pointer pb-1 inline-block" />
          <Handbag className="w-5 h-5 sm:w-6 sm:h-6 hover:text-[#282D31] transition duration-150 cursor-pointer pb-1 inline-block" />
        </div>
      </nav>
    </div>
  );
};

export default DekstopNavbar;
