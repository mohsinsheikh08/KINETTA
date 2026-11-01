"use client";

import React, { useEffect } from "react";
import useWishlist from "@/src/hooks/useWishlist";
import useCart from "@/src/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import Loading from "@/src/components/LandingComp/Loading";
import LoadingSpinner from "@/src/components/LandingComp/LoadingSpinner";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const WishlistPage = () => {
  const { wishlist, getWishlist, removeProduct, loading, productLoading } =
    useWishlist();
  console.log(wishlist, "wishlist");
  const { createCart } = useCart();

  useEffect(() => {
    getWishlist();
  }, []);

  const wishlistArray = Array.isArray(wishlist)
    ? wishlist
    : wishlist?.wishlist && Array.isArray(wishlist.wishlist)
      ? wishlist.wishlist
      : [];

  if (loading) return <Loading />;

  if (productLoading) return <LoadingSpinner />;

  if (wishlistArray.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-10 md:p-16 border border-black/10 flex flex-col items-center text-center max-w-lg shadow-sm">
          <Heart size={48} className="text-neutral-300 mb-6" strokeWidth={1} />
          <h2 className="text-2xl font-medium mb-3">Your Wishlist is Empty</h2>
          <p className="text-neutral-500 mb-8 text-sm">
            Looks like you haven&apos;t saved any items yet. Explore our
            collection and save your favorites.
          </p>
          <Link
            href="/shop"
            className="bg-black text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleMoveToBag = async (productId: string) => {
    await createCart({
      product: productId,
      quantity: 1,
      size: "M",
      color: "black",
    });
    await removeProduct(productId);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-10 px-4 md:px-8 mt-10 md:mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500">
              Saved Items
            </p>
            <h1 className="text-3xl md:text-5xl font-medium tracking-[-0.04em]">
              My Wishlist
            </h1>
          </div>
          <span className="text-sm text-neutral-500">
            {wishlistArray.length} item{wishlistArray.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistArray.map((item) => {
            const product = item.product || item;
            if (!product) return null;

            return (
              <div
                key={item._id}
                className="bg-white border border-black/10 group relative flex flex-col"
              >
                <button
                  onClick={() => removeProduct(product._id)}
                  className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow-sm text-neutral-400 hover:text-red-500 transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>

                <Link
                  href={`/product/${product._id}`}
                  className="block relative aspect-[4/5] bg-[#f2f2f0] overflow-hidden"
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.productName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="p-3 md:p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <Link href={`/product/${product._id}`}>
                      <h3 className="text-sm font-medium text-black truncate hover:text-neutral-600 transition-colors">
                        {product.productName}
                      </h3>
                    </Link>
                    <p className="text-sm font-semibold mt-1 text-black">
                      {formatPrice(product.finalPrice)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleMoveToBag(product._id)}
                    className="mt-4 w-full flex items-center justify-center gap-2 border border-black bg-transparent py-2.5 text-[10px] font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    <ShoppingBag size={14} /> Move to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
