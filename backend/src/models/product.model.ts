import mongoose from "mongoose";
const gymWearColors = [
  "black",
  "white",
  "off-white",
  "ivory",
  "grey",
  "light-grey",
  "dark-grey",
  "charcoal",
  "slate",
  "silver",

  "beige",
  "cream",
  "sand",
  "brown",
  "chocolate",
  "tan",
  "khaki",
  "mocha",
  "taupe",
  "camel",

  "red",
  "crimson",
  "maroon",
  "burgundy",
  "wine",
  "pink",
  "hot-pink",
  "blush",
  "dusty-rose",
  "coral",

  "navy",
  "blue",
  "royal-blue",
  "sky-blue",
  "teal",
  "turquoise",
  "green",
  "olive",
  "emerald",
  "sage",
  "mint",
  "forest-green",

  "yellow",
  "mustard",
  "gold",
  "orange",
  "peach",

  "purple",
  "lavender",
  "plum",
  "violet",
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
      enum: ["Tops", "Shirts", "Bottoms", "Footwear", "Accessories"],
      required: true,
      default: "Tops",
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
      default: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    tsObject: { virtuals: true },
  },
);

const productModel = mongoose.model("Product", productSchema);

export { productModel };
