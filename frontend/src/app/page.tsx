
import React from "react";
import MenImage from "../../public/men_landing_page_image.jpg";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
const page = () => {

  return (
    <div className="w-full h-screen ">
      <div className=" w-full h-8 sm:h-15  ">
        <Navbar />
      </div>
      <div className="p-2 lg:p-10 h-20">
        <Video />
      </div>
    </div>
  );
};

export default page;
