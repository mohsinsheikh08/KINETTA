import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller";
import { tokenChecker, authorize } from "../middleware/auth.middleware";
import express from "express";
const router = express.Router();
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
router.post(
  "/create-product",
  tokenChecker,
  authorize("product_manager", "super_admin"),
  upload.array("images"),
  createProduct,
);

router.get("/get-products", getAllProducts);

router.get("/:id", getProduct);

router.delete(
  "/:id",
  tokenChecker,
  authorize("super_admin", "product_manager"),
  deleteProduct,
);

router.patch(
  "/:id",
  tokenChecker,
  authorize("super_admin", "product_manager"),
  updateProduct,
);
export default router;
  