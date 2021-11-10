const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res, next) => {
  const campground = await Campground.findById(req.params.campgroundId);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);

  const saveReview = review.save();
  const saveCampground = campground.save();
  await Promise.all([saveReview, saveCampground]);
  res.json({ status: "success" });
};

module.exports.deleteReview = async (req, res, next) => {
  const { campgroundId, reviewId } = req.params;
  await Campground.findByIdAndUpdate(campgroundId, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  res.json({ status: "success" });
};
