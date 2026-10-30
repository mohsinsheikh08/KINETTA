import { tokenBlacklistModel, userModel } from "../models/auth.model";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthReports } from "../types/types";
const fixedEmails: Record<string, string> = {
  "mohsinshahidsheikh1@gmail.com": "super_admin",
  "delivery@kenitta.com": "delivery_manager",
  "product@kenitta.com": "product_manager",
  "order@kenitta.com": "order_manager",
  "support@kenitta.com": "chat_support",
  "usermanager@kenitta.com": "user_manager",
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const role = (fixedEmails[email] || "customer") as
      | "customer"
      | "super_admin"
      | "chat_support"
      | "order_manager"
      | "product_manager"
      | "user_manager"
      | "delivery_manager";

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      (process.env.JWT_SECRET as string) || "default_secret",
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: user
        ? {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          }
        : null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      (process.env.JWT_SECRET as string) || "default_secret",
      { expiresIn: "7d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    if (token) {
      await tokenBlacklistModel.create({
        token: token,
      });
    }

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const getMe = async (req: AuthReports, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      user: user
        ? {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          }
        : null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const getAllUsers = async (req: AuthReports, res: Response) => {
  try {
    const users = await userModel.find({ role: "customer" });

    res.status(200).json({
      message: "All users are fetched successfully!",
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const deleteUser = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Khud ko delete karne se roko
    if (user._id.toString() === req.user?.id) {
      return res.status(403).json({ message: "You cannot delete yourself!" });
    }

    await userModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};
export { registerUser, loginUser, logoutUser, getMe, getAllUsers, deleteUser };
