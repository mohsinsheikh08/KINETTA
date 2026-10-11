import api from "../libs/api";
import { Wishlist } from "../types/wishlist.types";

const wishlistService = {
  addProduct: async (product: string): Promise<Wishlist> => {
    const response = await api.post<Wishlist>("/wishlist/add-product", {product});
    return response.data;
  },
  getWishlist: async (): Promise<Wishlist> => {
    const response = await api.get<Wishlist>("/wishlist/get-wishlist");
    return response.data;
  },
  clearWishlist: async (): Promise<string> => {
    const response = await api.delete<string>("/wishlist/clear-wishlist");
    return response.data;
  },
  removeProduct: async (productId: string): Promise<Wishlist> => {
    const response = await api.delete<Wishlist>("/wishlist/remove", {
      data: { product: productId },
    });
    return response.data;
  },
};

export default wishlistService;
