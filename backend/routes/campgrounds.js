const express = require("express");
const router = express.Router();

const campgroundControllers = require("../controllers/campgrounds");

const {
  isLoggedIn,
  authorizeCampground,
  validateCampground,
} = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

router
  .route("/")
  .get(catchAsync(campgroundControllers.index))
  .post(
    isLoggedIn,
    validateCampground,
    catchAsync(campgroundControllers.createCampground)
  );

router
  .route("/:id")
  .get(catchAsync(campgroundControllers.showCampground))
  .put(
    isLoggedIn,
    validateCampground,
    authorizeCampground,
    catchAsync(campgroundControllers.updateCampground)
  )
  .delete(
    isLoggedIn,
    authorizeCampground,
    catchAsync(campgroundControllers.deleteCampground)
  );

module.exports = router;
