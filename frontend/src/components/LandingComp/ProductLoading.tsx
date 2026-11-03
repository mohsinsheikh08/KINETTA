import React from 'react';

const GridLoading= () => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex justify-between">
      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4 animate-pulse">
            
            <div className="w-full aspect-[4/5] bg-gray-200 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>

            <div className="flex justify-between items-start px-1">
              <div className="flex flex-col gap-2 w-2/3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLoading;