"use client"
import { createContext, useState } from "react";
import { childrenType } from "../types/common.types";
import { Wishlist, WishlistStructure } from "../types/wishlist.types";
import wishlistService from "../services/wishlist.service";
import axios from "axios";

export const WishlistContext = createContext<WishlistStructure | undefined>(
  undefined,
);

const WishlistProvider = ({ children }: childrenType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);

  // ============ GET WISHLIST ============
  const getWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await wishlistService.getWishlist();
      setWishlist(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Wishlist not found!");
      }
      setError("Wishlist not found!");
    } finally {
      setLoading(false);
    }
  };

  // ============ ADD PRODUCT ============
  const addProduct = async (product: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await wishlistService.addProduct(product);
      setWishlist(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Product not added!");
      }
      setError("Product not added!");
    } finally {
      setLoading(false);
    }
  };

  // ============ REMOVE PRODUCT ============
  const removeProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await wishlistService.removeProduct(productId);
      setWishlist(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Product not removed!");
      }
      setError("Product not removed!");
    } finally {
      setLoading(false);
    }
  };

  // ============ CLEAR WISHLIST ============
  const clearWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      await wishlistService.clearWishlist();
      setWishlist(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Wishlist not cleared!");
      }
      setError("Wishlist not cleared!");
    } finally {
      setLoading(false);
    }
  };

  const value: WishlistStructure = {
    loading,
    error,
    wishlist,
    getWishlist,
    addProduct,
    removeProduct,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;