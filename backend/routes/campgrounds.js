const express = require("express");
const router = express.Router();

const Campground = require("../models/campground");

const {
  isLoggedIn,
  authorizeCampground,
  validateCampground,
} = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("author");
    if (!campground) {
      throw new ExpressError(404, "Campground not Found");
    }
    res.json(campground);
  })
);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    res.json({ status: "success" });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateCampground,
  authorizeCampground,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.json({ status: "success" });
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  authorizeCampground,
  catchAsync(async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  })
);

module.exports = router;
