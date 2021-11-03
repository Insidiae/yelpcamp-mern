const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const { campgroundSchema, reviewSchema } = require("./schemas");

const Campground = require("./models/campground");
const Review = require("./models/review");

const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error(err);
  });

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    if (!campground) {
      throw new ExpressError(404, "Campground not Found");
    }
    res.json(campground);
  })
);

app.post(
  "/campgrounds",
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.json({ status: "success" });
  })
);

app.put(
  "/campgrounds/:id",
  validateCampground,
  catchAsync(async (req, res, next) => {
    await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });
    res.json({ status: "success" });
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  })
);

app.post(
  "/campgrounds/:id/reviews",
  validateReview,
  catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);

    const saveReview = review.save();
    const saveCampground = campground.save();
    await Promise.all([saveReview, saveCampground]);
    res.json({ status: "success" });
  })
);

app.delete(
  "/campgrounds/:campgroundId/reviews/:reviewId",
  catchAsync(async (req, res, next) => {
    const { campgroundId, reviewId } = req.params;
    await Campground.findByIdAndUpdate(campgroundId, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.json({ status: "success" });
  })
);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong :(" } = err;
  res.status(status).json({ errorMsg: message });
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
