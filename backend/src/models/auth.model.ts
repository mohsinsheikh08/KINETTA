import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Please fill a valid email address",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "customer",
        "super_admin",
        "chat_support",
        "order_manager",
        "product_manager",
        "delivery_manager",
        "user_manager"
      ],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);
const tokenBlacklistModel = mongoose.model(
  "TokenBlacklist",
  tokenBlacklistSchema,
);

export { userModel, tokenBlacklistModel };
