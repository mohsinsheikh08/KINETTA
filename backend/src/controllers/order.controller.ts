import cartModel from "../models/cart.model";
import orderModel from "../models/order.model";
import { productModel } from "../models/product.model";
import { AuthReports } from "../types/types";
import { Response } from "express";

const createOrder = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;
    const {
      address: { street, city, state, postalCode, country },
      emergencyNumber,
      number,
      notes,
    } = req.body;

    let totalAmount = 0;
    let cartItems = [];

    if (!street || !city || !state || !postalCode || !country || !number) {
      return res.status(401).json({
        message: "all fileds required!",
      });
    }

    let cart = await cartModel
      .findOne({ user: user })
      .populate(
        "items.product",
        "productName price thumbnail finalPrice stock",
      );

    if (!cart) {
      return res.status(404).json({
        message: "cart is not available!",
      });
    }

    if (cart.items.length === 0) {
      return res.status(409).json({
        message: "At least add 1 product in cart",
        success: false,
      });
    }

    for (const item of cart.items) {
      let product = item.product as any;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.productName}`,
        });
      }

      const itemPrice = product.finalPrice || product.price;
      totalAmount += itemPrice * item.quantity;

      cartItems.push({
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: itemPrice,
      });

      await productModel.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity },
      });
    }
    const order = await orderModel.create({
      user: user,
      items: cartItems,
      status: "pending",
      paymentMethod: "COD",
      number: number,
      emergencyNumber,
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
      notes,
      totalAmount,
    });
    cart.items.pull({});
    await cart.save();

    res.status(201).json({
      message: "order sucessfully placed!",
      cart: order,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const getMyOrder = async (req: AuthReports, res: Response) => {
  try {
    const user = req.user?.id;

    if (!user) {
      return res.status(409).json({
        message: "User is not available!",
      });
    }
    const order = await orderModel
      .findOne({ user: user })
      .populate(
        "items.product user",
        "firstName lastName email role thumbnail finalPrice productName price stock",
      );

    return res.status(200).json({
      message: "order fetched successfully!",
      order: order,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const getAllOrders = async (req: AuthReports, res: Response) => {
  try {
    const orders = await orderModel
      .find()
      .populate(
        "items.product user",
        "firstName lastName email role productName price finalPrice thumbnail stock",
      );
    if (!orders) {
      return res.status(409).json({
        message: "Order is not available!",
      });
    }

    return res.status(200).json({
      message: "All orders are fetched sucessfully!",
      orders: orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const updateOrderStatus = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;
 const {status} = req.body;
    const validStatus = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if(!validStatus.includes(status)){
      return res.status(401).json({
        message: "status is not valid!"
      })
    }

    if (!id) {
      return res.status(409).json({
        message: "Order is not available!",
        success: false,
      });
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      {status},
      { runValidators: true, returnDocument: "after" },
    );

    return res.status(200).json({
      message: "status updated successfully!",
      order: order,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};
export { createOrder, getMyOrder, getAllOrders, updateOrderStatus };
