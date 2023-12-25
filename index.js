const express = require("express");
const session = require("express-session");
const User = require("./Models/User");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verify = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false);
    }

    // Проверка пароля
    if (user.password !== password) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const options = {
  usernameField: "username",
  passwordField: "password",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("req.user: ", req.user);
    res.redirect("/");
  }
);

app.get(
  "/me",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },
  (req, res) => {
    res.render("me", { user: req.user });
  }
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  const newUser = new User(req.body);
  newUser.save();
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "";

mongoose.connect(MONGO_URL).then(() => {
  console.log("Монго подключена");
});
app.listen(PORT, () => {
  console.log("Приложение запущено");
  console.log(`http://localhost:${PORT}`);
});
