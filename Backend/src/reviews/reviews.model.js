const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true, // Index for faster lookups
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for faster lookups
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Avoid OverwriteModelError
const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

module.exports = Review;
