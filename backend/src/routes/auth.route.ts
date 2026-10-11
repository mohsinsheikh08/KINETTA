import express from "express";
import { authorize } from "../middleware/auth.middleware";
import { deleteUser, getAllUsers } from "../controllers/auth.controller";
import { tokenChecker } from "../middleware/auth.middleware";
const router = express.Router();

import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "../controllers/auth.controller";

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post ("/logout", tokenChecker, logoutUser);

router.get("/me", tokenChecker, getMe)


router.get("/all-users", tokenChecker, authorize("super_admin", "user_manager"), getAllUsers)
router.delete(
  "/delete-user/:id",
  tokenChecker,
  authorize("super_admin", "user_manager"), 
  deleteUser,
);
export default router;