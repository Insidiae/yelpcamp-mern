const { cloudinary } = require("../cloudinary");
const Campground = require("../models/campground");
const ExpressError = require("../utils/ExpressError");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_TOKEN });

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
};

module.exports.createCampground = async (req, res, next) => {
  const geoData = await geocodingClient
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
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
  if (req.body.deletedImages) {
    for (let img of req.body.deletedImages) {
      await cloudinary.uploader.destroy(img.filename, { invalidate: true });
    }
  }

  await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });

  res.json({ status: "success" });
};

module.exports.deleteCampground = async (req, res, next) => {
  await Campground.findByIdAndDelete(req.params.id);
  res.json({ status: "success" });
};
