"use client";
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
  const [loadingSpinner, setloadingSpinner] = useState(false);
  const createCart = async (data: createCart) => {
    try {
      setError(null);
      setLoading(true);
      const result = await cartService.createCart(data);
      setCart(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Add to cart failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await cartService.getCart();
      console.log(
        "all products:",
        JSON.stringify(
          result?.items?.map((i) => i.product),
          null,
          2,
        ),
      );
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

  const updateCart = async (data: updateCart) => {
    try {
      setloadingSpinner(true);
      setError(null);
      const result = await cartService.updateCart(data);
      setCart(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("Cart update failed!");
      }
    } finally {
      setloadingSpinner(false);
    }
  };

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
        setError("Product removal failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await cartService.deleteCart();
      setCart(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("Clear cart failed!");
      }
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
    loadingSpinner
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
