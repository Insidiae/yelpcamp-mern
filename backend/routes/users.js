const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

router.post("/register", catchAsync(userController.register));

router.post(
  "/login",
  passport.authenticate("local"),
  catchAsync(userController.login)
);

router.post("/logout", userController.logout);

module.exports = router;
