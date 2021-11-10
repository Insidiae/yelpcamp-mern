const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    images: Joi.array()
      .max(10)
      .items(
        Joi.object({
          filename: Joi.string().required(),
          url: Joi.string().required(),
          thumbUrl: Joi.string().required(),
        })
      ),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deletedImages: Joi.array().items(
    Joi.object({
      filename: Joi.string().required(),
      url: Joi.string().required(),
      thumbUrl: Joi.string().required(),
    })
  ),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }),
});
