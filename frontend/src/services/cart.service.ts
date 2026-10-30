import api from "../libs/api";
import { createCart, Cart, updateCart, CartResponse } from "../types/cart.types";

const cartService = {
  createCart: async (data: createCart): Promise<Cart> => {
    const response = await api.post<CartResponse>("/cart/add-to-cart", data);
    return response.data.cart; // Sirf cart return karo
  },
  
  getCart: async (): Promise<Cart> => {
    const response = await api.get<CartResponse>(`/cart/get-cart`);
    return response.data.cart; // Sirf cart return karo
  },
  
  updateCart: async (data: updateCart): Promise<Cart> => {
    const response = await api.patch<CartResponse>("/cart/update-cart", data);
    return response.data.cart; // Sirf cart return karo
  },
  
  deleteCart: async (): Promise<string> => {
    const response = await api.delete<{ message: string }>("/cart/clear-cart");
    return response.data.message;
  },
  
  deleteProductInCart: async (id: string): Promise<string> => {
    const response = await api.delete<{ message: string }>(`/cart/remove/${id}`);
    return response.data.message;
  },
};

export default cartService;