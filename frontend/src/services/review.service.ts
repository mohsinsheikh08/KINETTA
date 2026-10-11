import api from "../libs/api";
import { addReview, getProductReviews, Review } from "../types/review.types";

const reviewService = {
  addReview: async (data: addReview): Promise<Review> => {
    const response = await api.post<Review>("/review/add", data);
    return response.data;
  },
  getProductReviews: async (id: string): Promise<getProductReviews> => {
    const response = await api.get<getProductReviews>(`/review/product/${id}`);
    return response.data;
  },
  deleterReview: async (id: string): Promise<string> => {
    const response = await api.delete<string>(`/review/${id}`);
    return response.data;
  },
};

export default reviewService