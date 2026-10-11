"use client";
const Video = () => {
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
    poster="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/men_landing_page_image.jpg?updatedAt=1791542499393"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="https://ik.imagekit.io/mohsinsheikh08/kinetta/product/MenVideoGymWear.mp4" type="video/mp4" />
  </video>

  {/* Dark Gradient Overlay — full height */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

  {/* Text Content — absolute, full height */}
  <div className="absolute inset-0 flex flex-col justify-end sm:justify-center items-start text-white px-6 sm:px-12 md:px-20 pb-12 sm:pb-0">
    <h1 className="text-3xl font-heading sm:text-5xl md:text-7xl font-bold tracking-wider">
      MEN&apos;S COLLECTION
    </h1>
    <p className="mt-3 sm:mt-4 font-body text-sm sm:text-base md:text-lg tracking-widest uppercase opacity-90">
      Engineered for Performance
    </p>
    <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-white text-black font-semibold uppercase tracking-wider text-sm sm:text-base hover:bg-gray-200 transition">
      Shop Now
    </button>
  </div>
  </div>
  );
};

export default Video;
