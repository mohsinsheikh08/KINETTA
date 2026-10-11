import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrder,
  updateOrderStatus,
} from "../controllers/order.controller";
import { authorize, tokenChecker } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create-order", tokenChecker, createOrder);

router.get("/get-order", tokenChecker, getMyOrder);

router.get(
  "/all-orders",
  tokenChecker,
  authorize("super_admin", "order_manager"),
  getAllOrders,
);

router.patch(
  "/:id",
  tokenChecker,
  authorize("super_admin", "order_manager"),
  updateOrderStatus,
);
export default router;
