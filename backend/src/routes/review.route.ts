import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
} from "../controllers/review.controller";
import { tokenChecker } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/add", tokenChecker, addReview);


router.get("/product/:id", getProductReviews);


router.delete("/:id", tokenChecker, deleteReview);

export default router;