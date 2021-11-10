const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  isLoggedIn,
  validateReview,
  authorizeReview,
} = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const reviewController = require("../controllers/reviews");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(reviewController.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  authorizeReview,
  catchAsync(reviewController.deleteReview)
);

module.exports = router;
