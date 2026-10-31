import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f7f7f5]">

      <div className="relative flex h-16 w-16 items-center justify-center">

        <div className="absolute h-full w-full animate-spin rounded-full border-[2px] border-black/10 border-t-black"></div>
        
        <div className="h-2 w-2 rounded-full bg-black"></div>
      </div>

      <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500">
        Product Updating
      </p>
    </div>
  );
};

export default LoadingSpinner;