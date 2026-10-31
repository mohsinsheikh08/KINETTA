import { productModel } from "../models/product.model";
import { Response } from "express";
import { AuthReports } from "../types/types";
import uploadSmart from "../utils/uploadSmart";
import reviewModel from "../models/reviews.model";
const createProduct = async (req: AuthReports, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      productName,
      productDescription,
      category,
      subCategory,
      sizes,
      colors,
      price,
      stock,
      taxAmount,
      discount,
      isActive,
      isFeatured,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !category ||
      !subCategory ||
      !sizes ||
      !colors ||
      !price ||
      !stock
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "At least one image required!",
      });
    }
    const { provider, urls } = await uploadSmart(files);
    const thumbnail = urls[0];

    const priceNum = Number(price) || 0;
    const discountNum = Number(discount) || 0;
    const taxNum = Number(taxAmount) || 0;
    const stockNum = Number(stock) || 0;

    const discountValue = priceNum * (discountNum / 100);
    const taxValue = priceNum * (taxNum / 100);

    const final = priceNum - discountValue + taxValue;
    const finalProductPrice = Math.round(final * 100) / 100;

    const sizesArray = sizes
      .split(",")
      .map((size: string) => size.trim().toUpperCase());
    const colorsArray = colors
      .split(",")
      .map((color: string) => color.trim().toLowerCase());

    const product = await productModel.create({
      productName,
      productDescription,
      category,
      subCategory,
      sizes: sizesArray,
      colors: colorsArray,
      images: urls,
      thumbnail: thumbnail,
      price: priceNum,
      stock: stockNum,
      taxAmount: taxNum,
      discount: discountNum,
      finalPrice: finalProductPrice, 
      createdBy: userId,
      isActive,
      isFeatured,
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const getAllProducts = async (req: AuthReports, res: Response) => {
  try {
    const products = await productModel
      .find()
      .populate("createdBy", "firstName lastName");

    if (products.length === 0) {
      return res.status(409).json({
        message: "Products are not avilable!",
      });
    }
    return res.status(200).json({
      message: "All products are fetched",
      products: products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const getProduct = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(409).json({
        message: "product id is not available!",
      });
    }

    const product = await productModel
      .findById(id)
      .populate("createdBy", "firstName lastName");

    return res.status(200).json({
      message: "product fetched successfully!",
      product: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const deleteProduct = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(409).json({
        message: "Product is not available!",
      });
    }

    await productModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Product deleted successfully!",
    });
  } catch (err) {
    return res.status(409).json({
      message: "Internal Server Error!",
      err: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};

const updateProduct = async (req: AuthReports, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        message: "Product is not available!",
      });
    }

    const product = await productModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({
      message: "Product updated successfully!",
      product: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err instanceof Error ? err.message : "Unknown Error!",
    });
  }
};
export {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
