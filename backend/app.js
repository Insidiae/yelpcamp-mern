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

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.json(campground);
});

app.post("/campgrounds", async (req, res) => {
  try {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/campgrounds/:id", async (req, res) => {
  try {
    await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/campgrounds/:id", async (req, res) => {
  try {
    await Campground.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
