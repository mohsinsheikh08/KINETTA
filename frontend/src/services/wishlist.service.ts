import api from "../libs/api";
import { Wishlist, WishlistContextType } from "../types/wishlist.types";

const wishlistService = {
  addProduct: async (product: string): Promise<Wishlist> => {
    const response = await api.post<WishlistContextType>("/wishlist/add-product", {product});
    return response.data.wishlist;
  },
  getWishlist: async (): Promise<Wishlist> => {
    const response = await api.get<WishlistContextType>("/wishlist/get-wishlist");
    return response.data.wishlist;
  },
  clearWishlist: async (): Promise<string> => {
    const response = await api.delete<string>("/wishlist/clear-wishlist");
    return response.data;
  },
  removeProduct: async (productId: string): Promise<Wishlist> => {
    const response = await api.delete<WishlistContextType>("/wishlist/remove-product", {
      data: { product: productId },
    });
    return response.data.wishlist;
  },
};

export default wishlistService;
