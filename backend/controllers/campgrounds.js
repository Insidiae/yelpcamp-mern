const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
};

module.exports.createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  res.json({ status: "success" });
};

module.exports.showCampground = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  if (!campground) {
    throw new ExpressError(404, "Campground not Found");
  }
  res.json(campground);
};

module.exports.updateCampground = async (req, res, next) => {
  const { id } = req.params;
  await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.json({ status: "success" });
};

module.exports.deleteCampground = async (req, res, next) => {
  await Campground.findByIdAndDelete(req.params.id);
  res.json({ status: "success" });
};
