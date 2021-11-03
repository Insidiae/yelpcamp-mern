const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", ReviewSchema);
