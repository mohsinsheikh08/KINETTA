import express from "express";
import { getMessage, getConversations } from "../controllers/chat.controller";
import { authorize, tokenChecker } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/conversations",
  tokenChecker,
  authorize("super_admin", "chat_support"),
  getConversations,
);

router.get("/:id", tokenChecker, getMessage);

export default router;
