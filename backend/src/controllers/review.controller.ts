import { productModel } from "../models/product.model";
import reviewModel from "../models/reviews.model";
import { AuthReports } from "../types/types";
import { Response } from "express";
const addReview = async (req: AuthReports, res: Response) => {
  try {
    const { rating, comment, product } = req.body;
    const user = req.user?.id;
    if (!user) {
      return res.status(401).json({
        message: "Please Login First!",
      });
    }
    if (!rating || !product) {
      return res.status(400).json({
        message: "all fileds are required!",
      });
    }

    if (rating > 5 || rating < 1) {
      return res.status(400).json({
        message:
          "Rating must be less than or equal of 5, and greater than or equal of 1!",
      });
    }

    const reviewProduct = await productModel.findById(product);
    if (!reviewProduct) {
      return res.status(404).json({
        message: "Product is not available!",
      });
    }

    let review = await reviewModel.findOne({ user: user, product: product });

    const isReviewAlreadyExistOnProduct =
      review?.product.toString() === product ? true : false;

    if (isReviewAlreadyExistOnProduct) {
      return res.status(409).json({
        message: "Review Already Exist on this product",
      });
    } else {
      review = await reviewModel.create({
        user: user,
        rating: rating,
        comment: comment,
        product: product,
      });
    }

    const allreviews = await reviewModel.find({ product });

    const reviewsAvg =
      allreviews.reduce((sum, r) => sum + r.rating, 0) / allreviews.length;

    await productModel.findByIdAndUpdate(product, {
      rating: Math.round(reviewsAvg * 10) / 10,
      numReviews: allreviews.length,
    });
    await review.populate("user", "firstName lastName email role");
    await review.populate(
      "product",
      "productName price finalPrice thumbnail stock",
    );

    return res.status(201).json({
      message: "review added successfully!",
      review: review,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internel Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const getProductReviews = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        message: "Product ID is not avaialble!",
      });
    }

    const reviews = await reviewModel
      .find({ product: id })
      .populate("user", "firstName lastName email role")
      .populate("product", "productName price finalPrice thumbnail stock")
      .sort({ createdAt: -1 });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return res.status(200).json({
     
      count: reviews.length,
      averageRating: Math.round(avgRating * 10) / 10,
      reviews,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const deleteReview = async (req: AuthReports, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Please login first!" });
    }

    const review = await reviewModel.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found!" });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const productId = review.product;

    await reviewModel.findByIdAndDelete(id);

    const allReviews = await reviewModel.find({ product: productId });
    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;

    await productModel.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: allReviews.length,
    });

    return res.status(200).json({
      message: "Review deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

export { addReview, getProductReviews, deleteReview };
