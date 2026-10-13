"use client";
import { createContext, useState } from "react";
import { Product, productStructure } from "../types/product.types";
import { childrenType } from "../types/common.types";
import productService from "../services/product.service";
import axios from "axios";

export const ProductContext = createContext<productStructure | undefined>(
  undefined,
);
const ProductProvider = ({ children }: childrenType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);

  const createProduct = async (data: FormData) => {
    try {
      setError(null);
      setLoading(true);
      const result = await productService.createProduct(data);
      setProducts((prev) => [result, ...prev]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Product failed!");
      }
      setError("Product creation failed!");
    } finally {
      setLoading(false);
    }
  };
  const getAllProducts = async (): Promise<Product[]> => {
    try {
      setLoading(true);
      setError(null);
      const result = await productService.getProducts();
      setProducts(result);
      return result;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Products not found!");
      }
      setError("Products not found!");
      return [];
    } finally {
      setLoading(false);
    }
  };
  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await productService.getProduct(id);
      setCurrentProduct(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Product not found!");
      }
      setError("Product not found!");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (data: FormData, id: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await productService.updateProduct(data, id);
      setProducts((prev) =>
        prev.map((p) => (p._id === result._id ? result : p)),
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Product could not update!");
      }
      setError("Product could not updated!");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(
          err.response?.data?.message || "Product delete process failed!",
        );
        setError("Product delete process failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  const value: productStructure = {
    createProduct,
    loading,
    error,
    products,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProduct,
    currentProduct,
    isOpen,
    setIsOpen,
    setIsWomenOpen,
    isWomenOpen,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
