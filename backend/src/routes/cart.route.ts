import express from "express";
import {
  createCart,
  getCart,
  clearCart,
  updateCart,
  removeCart,
} from "../controllers/cart.controller";
import { tokenChecker } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/add-to-cart", tokenChecker, createCart);
router.get("/get-cart", tokenChecker, getCart);
router.patch("/update-cart", tokenChecker, updateCart);
router.delete("/clear-cart", tokenChecker, clearCart);
router.delete("/remove/:id", tokenChecker, removeCart)
export default router;
