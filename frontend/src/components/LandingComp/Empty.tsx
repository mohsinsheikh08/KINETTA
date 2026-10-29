import { PackageOpen } from "lucide-react";
import Link from "next/link";

const Empty = () => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <PackageOpen size={32} className="text-gray-400" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-medium text-gray-900 mb-2 uppercase tracking-wider">
        All Caught Up
      </h3>
      
      <p className="text-gray-500 text-sm max-w-sm mb-6">
        There are no new arrivals at the moment. Stay tuned to our social media for the next exclusive drop.
      </p>

      <Link 
        href="/shop" 
        className="text-black text-sm font-semibold underline underline-offset-4 hover:text-gray-600 transition-colors"
      >
        Browse other products
      </Link>
    </div>
  );
};

export default Empty;