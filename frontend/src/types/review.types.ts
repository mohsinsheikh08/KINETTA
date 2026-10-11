import { cartProduct, User } from "./cart.types";

export interface addReview {
  rating: number;
  product: string;
  comment?: string;
}

export interface Review {
  _id: string;
  user: User;
  rating: number;
  comment?: string;
  product: cartProduct;
}

interface reviewStructure {
  _id: string;
  user: User;
  rating: number;
  comment?: string;
  product: cartProduct;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface getProductReviews {
  count: number;
  averageRating: number;
  reviews: reviewStructure[];
}

export interface ReviewStructure {
  loading: boolean;
  error: null | string;
  addReview: (data: addReview) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  getProductReviews: (id: string) => Promise<void>;
  reviews: Review[];
  review: getProductReviews| null;
}
