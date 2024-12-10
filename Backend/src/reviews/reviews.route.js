const express = require("express");
const router = express.Router();
const Reviews = require("../reviews/reviews.model"); // Adjust to your project structure
const Products = require("../products/prodducts.modul"); // Adjust to your project structure

// Post a new review
router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;

    // Validate required fields
    if (!comment || !rating || !productId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the review already exists
    let existingReview = await Reviews.findOne({ productId, userId });

    if (existingReview) {
      // Update existing review
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      // Create a new review
      const newReview = new Reviews({
        comment,
        rating,
        productId,
        userId,
      });
      await newReview.save();
    }

    // Calculate the average rating for the product
    const reviews = await Reviews.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      // Update the product's rating
      const product = await Products.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    }

    // Send response
    res.status(200).json({
      message: "Review processed successfully",
      reviews,
    });
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: "Failed to post review" });
  }
});

// grt all reviews with count
router.get("/total-reviews", async (req, res) => {
  try {
    const totalreviews = await Reviews.countDocuments({});
    res.status(200).send({ totalreviews });
  } catch (error) {
    console.error("Error grtting total  review:", error);
    res.status(500).json({ message: "Failed to get review count" });
  }
});

// get reviews by userId
router.get("/:userId", async (res, req) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: "User I is require" });
  }
  try {
    const reviews = await Reviews.find({ userId: userId }).sort({
      createdAt: -1,
    });
    if (reviews.length === 0) {
      return res.status(400).send({ message: "no reviews found" });
    }
    res.status(200).send(reviews)
  } catch (error) {
    console.error("Error frtchung review by user:", error);
    res.status(500).json({ message: "Failed fetch review by user" });
  }
});
module.exports = router;
