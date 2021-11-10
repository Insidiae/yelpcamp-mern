const mongoose = require("mongoose");

const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error(err);
  });

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const c = new Campground({
      name: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          filename: "YelpCamp/eyavaftawkg4zupvehxt",
          url: "https://res.cloudinary.com/insidiae423/image/upload/v1636574754/YelpCamp/eyavaftawkg4zupvehxt.jpg",
          thumbUrl:
            "https://res.cloudinary.com/insidiae423/image/upload/c_scale,q_auto,w_200/v1636574754/YelpCamp/eyavaftawkg4zupvehxt.jpg",
        },
      ],
      price: 42069,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam delectus odio eligendi quasi.",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      author: "61880c2ad3ca744b5d0ea878",
    });
    await c.save();
  }
};

seedDB();
