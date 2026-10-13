import { Dispatch, SetStateAction } from "react";

interface productInfo {
  productName: string;
  productDescription: string;
  category: string;
  subCategory: string;
  sizes: string[];
  colors: string[];
  images: string[];
  thumbnail: string;
  price: number;
  stock: number;
  taxAmount: number;
  discount: number;
  isActive: boolean;
  isFeatured: boolean;
}

export interface Product extends productInfo {
  _id: string;
  finalPrice: number;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface productStructure {
  createProduct: (data: FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
  products: Product[] | null;
  getAllProducts: () => Promise<Product[]>;
  updateProduct: (data: FormData, id: string) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => void;
  currentProduct: Product | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isWomenOpen: boolean;
  setIsWomenOpen: Dispatch<SetStateAction<boolean>>;
}
