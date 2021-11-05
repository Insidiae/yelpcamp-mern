const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");

//! Might wanna change this when we deploy
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error(err);
  });

const sessionOptions = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUnitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionOptions));

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:campgroundId/reviews", reviewsRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong :(" } = err;
  res.status(status).json({ errorMsg: message });
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
