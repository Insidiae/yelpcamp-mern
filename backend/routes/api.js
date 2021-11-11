const express = require("express");
const router = express.Router();

router.get("/cloudinary", (req, res) => {
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  });
});

router.get("/mapbox", (req, res) => {
  res.json({
    token: process.env.MAPBOX_TOKEN,
  });
});

module.exports = router;
