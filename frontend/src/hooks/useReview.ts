"use client";
import { useContext } from "react";
import { ReviewContext } from "../context/ReviewProvider";

const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error("useReviw must be used in ReviewProvider!");
  return context!;
};

export default useReview;
