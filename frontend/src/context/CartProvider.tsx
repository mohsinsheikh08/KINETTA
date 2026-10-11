"use client"
import { createContext, useState } from "react";
import { childrenType } from "../types/common.types";
import {
  Cart,
  createCart,
  updateCart,
  cartStructure,
} from "../types/cart.types";
import cartService from "../services/cart.service";
import axios from "axios";

export const CartContext = createContext<cartStructure | undefined>(undefined);

const CartProvider = ({ children }: childrenType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  // ============ ADD TO CART ============
  const createCart = async (data: createCart) => {
    try {
      setError(null);
      setLoading(true);
      const result = await cartService.createCart(data);
      setCart(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Add to cart failed!");
      }
      setError("Add to cart failed!");
    } finally {
      setLoading(false);
    }
  };

  // ============ GET CART ============
  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await cartService.getCart();
      setCart(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Cart not found!");
      }
      setError("Cart not found!");
    } finally {
      setLoading(false);
    }
  };

  // ============ UPDATE CART (quantity) ============
  const updateCart = async (data: updateCart) => {
    try {
      setLoading(true);
      setError(null);
      const result = await cartService.updateCart(data);
      setCart(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Cart update failed!");
      }
      setError("Cart update failed!");
    } finally {
      setLoading(false);
    }
  };

  // ============ REMOVE ONE PRODUCT ============
  const deleteProductInCart = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
       await cartService.deleteProductInCart(id);
      setCart((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.filter((item) => item.product._id !== id),
            }
          : null,
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Product removal failed!");
      }
      setError("Product removal failed!");
    } finally {
      setLoading(false);
    }
  };

  // ============ CLEAR CART ============
  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await cartService.deleteCart();
      setCart(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Clear cart failed!");
      }
      setError("Clear cart failed!");
    } finally {
      setLoading(false);
    }
  };

  const value: cartStructure = {
    loading,
    error,
    cart,
    createCart,
    getCart,
    updateCart,
    deleteProductInCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
