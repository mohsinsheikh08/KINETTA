export interface createCart {
  product: string;
  quantity: number;
  size: string;
  color: string;
}

export type updateCart = createCart;

export interface cartProduct {
  _id: string;
  productName: string;
  price: number;
  finalPrice: number;
  thumbnail: string;
  stock: number;
  taxAmount: number;
  discount: number;
}

export interface cartItems {
  _id: string;
  product: cartProduct;
  quantity: number;
  size: string;
  color: string;
}

// Asli Cart Object
export interface Cart {
  _id: string;
  user: string;
  items: cartItems[];
  createdAt?: string;
  updatedAt?: string;
}

// Backend ka poora response
export interface CartResponse {
  message: string;
  cart: Cart;
}

export interface cartStructure {
  loading: boolean;
  error: string | null;
  createCart: (data: createCart) => Promise<void>;
  getCart: () => Promise<void>;
  clearCart: () => Promise<void>;
  updateCart: (data: updateCart) => Promise<void>;
  deleteProductInCart: (id: string) => Promise<void>;
  cart: Cart | null; // Yahan Cart object aayega, response nahi
}
