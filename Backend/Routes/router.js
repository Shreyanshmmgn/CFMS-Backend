const express = require("express");
const router = express.Router();
const utils = require("../functionLib/util");

const User = require("../Models/userModel");
const pendingUser = require("../Models/pendingRequests");

const authMiddleware = require("../functionLib/authenticationMiddleware");

// ------------ Home Route ------------

router.get("/", (req, res) => {
  res.send("Routing workss!! lets get started");
});

// ------------ Signup Route ------------
const { signup } = require("./signup");

router.post("/signup", signup);

// ------------ Login Route ------------
const { login } = require("./login");

router.post("/login", login);

// ------------ Forgot Password ------------

const { forgotPassword } = require("./forgotPassword");
router.post("/forgotPassword", forgotPassword);

// ------------ sendUserdata Password ------------

const { sendUserData } = require("./sendUserData");
router.post("/sendUserData", sendUserData);

// ------------ Change  Password ------------

const { changePassword } = require("./changePassword");
router.post("/changePassword/:email", changePassword);

// ------------ Activation Route ------------

// const { acitvateUser } = require("./activateUser");
// router.post("/user/:hash", acitvateUser);
router.post("/activate/user/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log(" Request form axios made  ");
  try {
    await pendingUser.findOne({ _id }).then(async (user) => {
      const { _id, userName, email, salt, hash, date, __V } = user;

      const newUser = new User({ _id, userName, email, salt, hash, date, __V });
      console.log("New USer : ", newUser);

      await newUser
        .save()
        .then((user) => {
          //   const id = user._id;
          res.json({
            success: true,
            user: user,
          });
        })
        .catch((err) => console.log(err));
    });

    await pendingUser.findOne({ _id }).deleteOne();
  } catch (err) {
    console.log(err);
    res.status(422).send("User cannot be activated!");
  }
});

// ------------ Registration Route ------------

const { registration } = require("./registration");
router.post("/registration", registration);

// ------------ Protected Route ------------

router.post("/protected", utils.authMiddleware, (req, res) => {
  console.log("Status : ", res.status);

  if (res.status == 200) {
    console.log("Protected route can be accessed ");
    res.status(200).json({ access: true });
  }
});
// ------------ LogoutRoute ------------

const { logout } = require("./logout");
router.post("/logout", logout);

// ------------ Exporting here------------

module.exports = router;
