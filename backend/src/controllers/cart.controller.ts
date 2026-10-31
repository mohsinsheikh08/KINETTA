import cartModel from "../models/cart.model";
import { Response } from "express";
import { AuthReports } from "../types/types";
import { productModel } from "../models/product.model";
const createCart = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;

    if (!user) {
      return res.status(401).json({
        message: "Please Login first!",
      });
    }
    const { quantity, size, color, product } = req.body;
    if (!quantity || !size || !color || !product) {
      return res.status(400).json({
        message: "all field are required!",
      });
    }

    const productExist = await productModel.findById(product);
    if (!productExist) {
      return res.status(403).json({
        message: "product is not avialable!",
      });
    }

    if (productExist.stock < quantity) {
      return res.status(404).json({
        message: `Only ${productExist.stock} items are avilable!`,
      });
    }
    let cart = await cartModel.findOne({ user: user });
    if (!cart) {
      cart = await cartModel.create({
        user: user,
        items: [{ product, quantity, size, color }],
      });
    } else {
      let isExisting = cart.items.find((item) => {
        return (
          item.product.toString() === product &&
          item.size === size &&
          item.color === color
        );
      });

      if (isExisting) {
        isExisting.quantity += quantity;
      } else {
        cart.items.push({ product, quantity, size, color });
      }
      await cart.save();
    }

    await cart.populate(
      "items.product",
      "productName price finalPrice thumbnail stock",
    );
    await cart.populate("user", "firstName role lastName email");
    res.status(201).json({
      message: "cart created successfully!",
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error",
    });
  }
};

const getCart = async (req: AuthReports, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({
        message: "cart is not avaialable!",
        sucess: false,
      });
    }
    const cart = await cartModel
      .findOne({ user: userId })
      .populate(
        "items.product",
        "productName price thumbnail finalPrice stock taxAmount discount",
      );

    return res.status(200).json({
      message: "cart fetched successfully!",
      cart: cart,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const updateCart = async (req: AuthReports, res: Response) => {
  try {
    const userId = req.user?.id;
    const { product, size, color, quantity } = req.body;

    if (!product || !size || !color || !quantity) {
      return res.status(401).json({
        message: "all fileds are required!",
      });
    }
    if (!userId) {
      return res.status(400).json({
        message: "user is not available!",
      });
    }
    
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({
        message: "cart is not avilable!",
      });
    }

    if (quantity < 1) {
      return res.status(404).json({
        message: "quantity must be at least 1",
      });
    }
    const isExisting = cart.items.find((item) => {
      return (
        item.product.toString() === product &&
        item.size === size &&
        item.color === color
      );
    });

    if (isExisting) {
      isExisting.quantity = quantity;
    } else {
      return res.status(404).json({
        message: "cart is not avialable!",
      });
    }

    await cart.save();

    await cart.populate(
      "items.product",
      "productName price finalPrice thumbnail stock",
    );
    return res.status(200).json({
      message: "code updated successfully!",
      cart: cart,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const clearCart = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;

    if (!user) {
      return res.status(409).json({
        message: "user is not available!",
      });
    }

    const cart = await cartModel.findOneAndDelete({ user: user });

    if (!cart) {
      return res.status(409).json({
        message: "cart is not available!",
      });
    }
    return res.status(200).json({
      message: "cart deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const removeCart = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user?.id;

    if (!user) {
      return res.status(409).json({
        message: "user is not available!",
      });
    }

    const cart = await cartModel.findOne({ user: user });

    if (!cart) {
      return res.status(409).json({
        message: "cart is not available!",
      });
    }

    let product = cart?.items.some((item) => {
      return item._id.toString() === id;
    });

    if (!product) {
      return res.status(404).json({
        message: "product is not available!",
      });
    }

    cart.items.pull({ _id: id });

    await cart.save();

    if (!cart) {
      return res.status(409).json({
        message: "cart is not available!",
      });
    }

    await cart.populate(
      "items.product",
      "productName price finalPrice thumbnail stock",
    );

    return res.status(200).json({
      message: "product deleted successfully in the cart!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};
export { createCart, getCart, updateCart, clearCart, removeCart };
