const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/userModel");
const utils = require("../functionLib/util");

router.get("/", (req, res) => {
  res.send("Routing workss!! lets get started");
});

// ------------ Signup Route ------------

router.post("/signup", (req, res) => {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user) => {
      console.log(user);
      //   const id = user._id;
      const jwt = utils.issueJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiersIn: jwt.expires,
      });
    })
    .catch((err) => console.log(err));
});

// ------------ Login Route ------------

router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        console.log("Wong password - 1");
        res.status(401).json({ success: false, msg: "User not found !" });
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const tokenObj = utils.issueJWT(user);
        res
          .status(200)
          .json({
            success: true,
            user: user,
            token: tokenObj,
            msg: "User found!!",
          })
          .then((user) => {});
      } else {
        console.log("Wong password - 2");
        res.status(401).json({
          success: false,
          msg: "Wrong password entered!!",
        });
      }
    })
    .catch((err) => next(err));
});

router.post;

module.exports = router;
