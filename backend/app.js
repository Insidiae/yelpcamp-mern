const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const Campground = require("./models/campground");

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

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
