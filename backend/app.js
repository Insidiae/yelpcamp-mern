if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const MongoDBStore = require("connect-mongo");

const User = require("./models/user");

const usersRoutes = require("./routes/users");
const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");
const apiRoutes = require("./routes/api");

//! Might wanna change this when we deploy
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(mongoSanitize({ replaceWith: "_" }));

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp";
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error(err);
  });

const secret = process.env.SECRET || "thisshouldbeabettersecret!";
const store = MongoDBStore.create({
  mongoUrl: DB_URL,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
  name: "yelpcamp_session",
  store,
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", usersRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:campgroundId/reviews", reviewsRoutes);
app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong :(" } = err;
  res.status(status).json({ errorMsg: message });
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
