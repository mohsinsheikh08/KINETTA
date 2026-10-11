import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: [1, "Review must be at least 1!"],
    max: [5, "Review mest be less than or equal of 5!"],
    required: true,
  },
  comment: {
    type: String,
    trim: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
},{
    timestamps: true
});

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;