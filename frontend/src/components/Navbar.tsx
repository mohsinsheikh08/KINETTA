import Image from "next/image";
import { UserRound, Heart, Search, Handbag, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-full w-full flex  justify-between  px-5 ">
      <div className="hidden lg:flex items-center  gap-5 h-full">
        <ul className="flex font-body font-semibold gap-5">
          <li>Men</li>
          <li>Women</li>
          <li>Shop All</li>
        </ul>
      </div>
      <div className="  flex items-center lg:hidden  gap-5 h-full">
        {" "}
        <Menu className="w-5 h-5  sm:w-6 sm:h-6 md:w-7 md:h-7" />
        <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </div>

      <div className="font-bold relative  flex  items-center  gap-2  py-2 px-2">
        <Image
          className="w-25 h-auto sm:w-40 md:w-48 lg:w-52"
          width={200}
          height={120}
          src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/KinettaText.png"
          alt="KinettaLogo"
          priority
        />
      </div>
      <div className="flex h-full justify-end gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center">
        <Search className="w-5 h-5 lg:flex hidden sm:w-6 sm:h-6 md:w-7 md:h-7" />
        <UserRound className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        <Handbag className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </div>
    </div>
  );
};

export default Navbar;
