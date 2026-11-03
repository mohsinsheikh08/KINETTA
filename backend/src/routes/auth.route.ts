import express from "express";
import { authorize } from "../middleware/auth.middleware";
import rateLimit from "express-rate-limit";
import {
  adminCheck,
  deleteUser,
  getAllUsers,
} from "../controllers/auth.controller";
import { tokenChecker } from "../middleware/auth.middleware";
const router = express.Router();

import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "../controllers/auth.controller";

const adminCheckLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many admin check requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", tokenChecker, logoutUser);

router.get("/me", tokenChecker, getMe);

router.post("/admin-check", adminCheckLimiter, adminCheck);

router.get(
  "/all-users",
  tokenChecker,
  authorize("super_admin", "user_manager"),
  getAllUsers,
);
router.delete(
  "/delete-user/:id",
  tokenChecker,
  authorize("super_admin", "user_manager"),
  deleteUser,
);
export default router;
