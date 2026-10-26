"use client"
import { createContext, useState } from "react";
import { childrenType } from "../types/common.types";
import {
  addReview,
  getProductReviews,
  Review,
  ReviewStructure,
} from "../types/review.types";
import reviewService from "../services/review.service";
import axios from "axios";
export const ReviewContext = createContext<ReviewStructure | undefined>(
  undefined,
);

const ReviewProvider = ({ children }: childrenType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [review, setReview] = useState<getProductReviews | null>(null);

  const addReview = async (data: addReview) => {
    try {
      setLoading(true);
      setError(null);
      const result = await reviewService.addReview(data);
      setReviews((prev) => [result, ...prev]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Review not shared!");
        setError("Review not shared!");
      }
    } finally {
      setLoading(false);
    }
  };

  const getProductReviews = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await reviewService.getProductReviews(id);
      console.log(result)
      setReview(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Reviews not found!");
        setError("Reviews not found!");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await reviewService.deleterReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Review not deleted!");
        setError("Review not deleted!");
      }
    } finally {
      setLoading(false);
    }
  };

  const value: ReviewStructure = {
    loading,
    error,
    addReview,
    deleteReview,
    getProductReviews,
    review,
    reviews
  };
  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export default ReviewProvider;
