import { cartProduct } from "./cart.types";
import { User } from "./auth.types";
interface wishlistStructure {
  product: cartProduct;
  _id: string;
}

export interface Wishlist {
  message: string;
  wishlist: {
    _id: string;
    user: User;
    wishlist: wishlistStructure[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}


export interface WishlistContextType {
  message: string;
  wishlist: Wishlist;
}

export interface WishlistStructure {
  loading: boolean;
  error: string | null;
  wishlist: Wishlist | null;
  getWishlist: () => Promise<void>;
  addProduct: (product: string) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  productLoading: boolean;
  heartLoading: boolean;
}