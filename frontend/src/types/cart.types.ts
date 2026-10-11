export interface createCart {
  product: string;
  quantity: number;
  size: string;
  color: string;
}

export type updateCart = createCart;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface cartProduct {
  _id: string;
  productName: string;
  price: number;
  finalPrice: number;
  thumbnail: string;
  stock: number;
}

export interface cartItems {
  product: cartProduct;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  message: string;
  _id: string;
  user: User;
  items: cartItems[];
}

export interface cartStructure {
  loading: boolean;
  error: string | null;
  createCart: (data: createCart) => Promise<void>;
  getCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateCart: (data: updateCart) => Promise<void>;
  deleteProductInCart: (id: string) => Promise<void>;
  cart: Cart | null;
}
