"use client"
import Image from "next/image";
import { UserRound, Heart, Search, Handbag, Menu } from "lucide-react";

const Navbar = () => {
  
  return (
    <div className="flex flex-col  md:hidden ">
      <div className="w-full h-10 flex justify-between p-4 md:p-5">
        <div className="flex items-center justify-between  gap-5">
          <Menu />
          <Search />
        </div>
        <div className="flex items-center">
          <Image
            className="w-30 sm:w-35"
            src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png?updatedAt=1791505574850"
            width={100}
            height={100}
            alt="KinettaText"
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <UserRound />
          <Heart />
          <Handbag />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
