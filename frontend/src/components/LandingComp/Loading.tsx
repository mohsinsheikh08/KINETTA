import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      

      <h1 className="text-black text-4xl md:text-5xl font-heading font-semibold tracking-[0.3em] uppercase mb-8 animate-pulse">
        Kinetta
      </h1>


      <div className="w-48 h-[2px] bg-gray-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-black animate-[loading_1.5s_ease-in-out_infinite]"></div>
      </div>

      <p className="mt-4 text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">
        Curating your experience
      </p>
    </div>
  );
};

export default Loading;