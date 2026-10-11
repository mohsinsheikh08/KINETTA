import wishlistModel from "../models/wishlist.model";
import { Response } from "express";
import { AuthReports } from "../types/types";
import { productModel } from "../models/product.model";
const addProductInWishlist = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;
    const { product } = req.body;
    if (!user) {
      return res.status(400).json({
        message: "Please Login First!",
      });
    }
    if (!product) {
      return res.status(401).json({
        message: "Product is not available!",
      });
    }

    const wishlistProduct = await productModel.findById(product);
    if (!wishlistProduct) {
      return res.status(409).json({
        message: "Product not found!",
      });
    }
    let wishlist = await wishlistModel.findOne({ user: user });

    if (wishlist) {
      const isProductAlreadyExist = wishlist.wishlist.some((item) => {
        return item.product.toString() === product;
      });

      if (isProductAlreadyExist) {
        return res.status(409).json({
          message: "Product is already in the wishlist!",
        });
      }
      wishlist.wishlist.push({ product });
    } else {
      wishlist = await wishlistModel.create({
        user: user,
        wishlist: [{ product: product }],
      });
    }
    await wishlist.save();
    await wishlist.populate(
      "wishlist.product user",
      "firstName lastName email role productName price finalPrice thumbnail stock",
    );

    return res.status(201).json({
      message: "product added successfully in wishlist!",
      wishlist: wishlist,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internel Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const removeProductInWishlist = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;
    const { product } = req.body;
    if (!user) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    if (!product) {
      return res.status(400).json({
        message: "Product is not available!",
      });
    }

    const wishlist = await wishlistModel.findOne({ user: user });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist is not available!",
      });
    }
    const isExist = wishlist.wishlist.some((item) => {
      return item.product.toString() === product;
    });

    if (!isExist) {
      return res.status(409).json({
        message: "Product is not available!",
      });
    }

    wishlist.wishlist = wishlist?.wishlist.filter((item) => {
      return item.product.toString() !== product;
    }) as typeof wishlist.wishlist;

    await wishlist.save();
    await wishlist.populate(
      "wishlist.product user",
      "firstName lastName email role productName price finalPrice thumbnail stock",
    );
    return res.status(200).json({
      message: "Product deleted successfully in the wishlist!",
      wishlist: wishlist,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const clearWishlist = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;
    if (!user) {
      return res.status(401).json({
        message: "Please Login First!",
      });
    }
    await wishlistModel.findOneAndDelete({ user: user });
    res.status(200).json({
      message: "Wishlist cleared successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const getWishlist = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;

    if (!user) {
      return res.status(401).json({
        message: "Please Login First",
      });
    }

    const wishlist = await wishlistModel
      .findOne({ user: user })
      .populate(
        "wishlist.product user",
        "firstName lastName email role productName price finalPrice thumbnail stock",
      );

    return res.status(200).json({
      message: "wishlist fetched successfully!",
      wishlist: wishlist,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internel Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

export {
  addProductInWishlist,
  removeProductInWishlist,
  getWishlist,
  clearWishlist,
};
