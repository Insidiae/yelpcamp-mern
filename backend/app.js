const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const Campground = require("./models/campground");

const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Database connected!");
});

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
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      throw new ExpressError(404, "Campground not Found");
    }
    res.json(campground);
  })
);

app.post(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.json({ status: "success" });
  })
);

app.put(
  "/campgrounds/:id",
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

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong :(" } = err;
  res.status(status).json({ errorMsg: message });
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
