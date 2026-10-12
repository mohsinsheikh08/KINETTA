"use client";
import { VideoPropsType } from "../types/common.types";
const Video = ({posterSrc, videoSrc, mainHeading,secondHeading}: VideoPropsType) => {
  const videoHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div
      className="relative w-full h-[80vh] sm:h-screen overflow-hidden"
      onContextMenu={(e) => {
        videoHandler(e);
      }}
    >
 <video
    autoPlay
    muted
    loop
    playsInline
    poster={posterSrc}
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={videoSrc} type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

  <div className="absolute inset-0 flex flex-col justify-end sm:justify-center items-start text-white px-6 sm:pt-100 sm:px-12 md:px-20 pb-12 sm:pb-0 md:pt-50">
    <h1 className="text-2xl font-heading sm:text-5xl md:text-6xl font-bold tracking-wider">
      {mainHeading}
    </h1>
    <p className="mt-3 sm:mt-4 font-body text-sm sm:text-base md:text-lg tracking-widest uppercase opacity-90">
     {secondHeading}
    </p>
    <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-white text-black font-semibold uppercase tracking-wider text-sm sm:text-base hover:bg-gray-200 transition">
      Shop Now
    </button>
  </div>
  </div>
  );
};

export default Video;
