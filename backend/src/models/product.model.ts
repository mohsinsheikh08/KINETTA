import mongoose from "mongoose";

const gymWearColors = [
  // Basic
  "black",
  "white",
  "grey",
  "charcoal",
  "slate",

  // Neutral / Earth
  "beige",
  "cream",
  "brown",
  "tan",
  "khaki",

  // Bold / Gym
  "red",
  "maroon",
  "navy",
  "blue",
  "olive",
  "green",
  "teal",
  "purple",
  "pink",

  // Premium / Fashion
  "sage",
  "mocha",
  "dustyRose",
  "lavender",
  "skyBlue",
];
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Men", "Women"],
      required: true,
      default: "Men",
    },
    subCategory: {
      type: String,
      enum: ["Shirts", "Pants", "Shoes", "Accessories"],
      required: true,
      default: "Shirts",
    },
    sizes: {
      type: [String],
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
      default: ["M"],
    },
    colors: {
      type: [String],
      required: true,
      enum: gymWearColors,
      default: ["black"],
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one image is required",
      },
    },
    thumbnail: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    },
    taxAmount: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default : true
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    tsObject: { virtuals: true },
  },
);

const productModel = mongoose.model("Product", productSchema);

export { productModel };
