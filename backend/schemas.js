const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    name: Joi.string().required().escapeHTML(),
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
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
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
    body: Joi.string().required().escapeHTML(),
    rating: Joi.number().required().min(1).max(5),
  }),
});
