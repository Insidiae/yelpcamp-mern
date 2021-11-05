const express = require("express");
const router = express.Router({ mergeParams: true });

const { reviewSchema } = require("../schemas");

const Campground = require("../models/campground");
const Review = require("../models/review");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.campgroundId);
    const review = new Review(req.body.review);
    campground.reviews.push(review);

    const saveReview = review.save();
    const saveCampground = campground.save();
    await Promise.all([saveReview, saveCampground]);
    res.json({ status: "success" });
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res, next) => {
    const { campgroundId, reviewId } = req.params;
    await Campground.findByIdAndUpdate(campgroundId, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.json({ status: "success" });
  })
);

module.exports = router;
