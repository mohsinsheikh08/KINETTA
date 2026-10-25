import api from "../libs/api";
import { Product } from "../types/product.types";

const productService = {
  createProduct: async (data: FormData): Promise<Product> => {
    const response = await api.post("/products/create-product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<{ message: string; products: Product[] }>(
      "/products/get-products",
    );
    return response.data.products;
  },
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<{ message: string; product: Product }>(
      `/products/${id}`,
    );
    return response.data.product;
  },
  deleteProduct: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/products/${id}`);
    return response.data;
  },
  updateProduct: async (data: FormData, id: string): Promise<Product> => {
    const response = await api.patch<Product>(`/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default productService;
