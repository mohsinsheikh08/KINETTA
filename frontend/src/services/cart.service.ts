import api from "../libs/api";
import { createCart, Cart, updateCart } from "../types/cart.types";

const cartService = {
  createCart: async (data: createCart): Promise<Cart> => {
    const response = await api.post<Cart>("/cart/add-to-cart", data);
    return response.data;
  },
  getCart: async (): Promise<Cart> => {
    const response = await api.get<Cart>(`/cart/get-cart`);
    return response.data;
  },
  updateCart: async (data: updateCart): Promise<Cart> => {
    const response = await api.patch<Cart>("/cart/update-cart", data);
    return response.data;
  },
  deleteCart: async (): Promise<string> => {
    const response = await api.delete<string>("/cart/clear-cart");
    return response.data;
  },
  deleteProductInCart: async (id: string): Promise<string> => {
    const response = await api.delete<string>(`/cart/remove/${id}`);
    return response.data;
  },
};

export default cartService;
