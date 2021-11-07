const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

router.post(
  "/register",
  catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const currentUser = await User.register(user, password);
    req.login(currentUser, (err) => {
      if (err) {
        throw new ExpressError(
          500,
          "Something went wrong with registering the user."
        );
      } else {
        // console.log(currentUser);
        res.json({ _id: currentUser._id, username });
      }
    });
  })
);

router.post(
  "/login",
  passport.authenticate("local"),
  catchAsync(async (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // console.log(req.user);
    const { _id, username } = req.user;
    res.json({ _id, username });
  })
);

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ status: "success" });
});

module.exports = router;
