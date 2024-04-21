const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const User = require("../models/userModel");

exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }

    let newUser = new User({
      first_name: req.body.fname,
      last_name: req.body.lname,
      name: req.body.fname + " " + req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPass,
      city: req.body.city,
      country: req.body.country,
      dietary_preferences: req.body.dietary_preferences,
    });
    newUser
      .save({ useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(newUser);
        res.redirect("/");
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

exports.login = (req, res, next) => {
  var email = req.body.email;
  var Password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(Password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ id: user._id }, "verySecretValue", {
            expiresIn: "1h",
          });
          res.cookie("User", token);
          res.redirect("/views/home");
        } else {
          console.log("Incorrect Password");
          res.redirect("/");
        }
      });
    } else {
      console.log("Incorrect Username");
      res.redirect("/");
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("User").redirect("/");
};

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ results: users.length, data: users });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ results: users.length, data: users });
});

exports.deleteUser = (req, res) => {
  let ID = req.body.id;
  User.deleteOne({ id: ID });
  console.log("User of id: " + ID + " has been deleted");
  res.status(200);
};

exports.getIdFromCookie = (req, res) => {
  const info = req.cookies;
  const token = info.User;
  const payload = jwt.decode(token);
  const id = payload.id;
  return id;
};
