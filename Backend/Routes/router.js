const express = require("express");
const router = express.Router();
const utils = require("../functionLib/util");

//* ------------ Home Route ------------

router.get("/", (req, res) => {
  res.send("Routing workss!! lets get started");
});

//* ------------ Signup Route ------------
const { signup } = require("./signup");

router.post("/signup", signup);

//* ------------ Login Route ------------
const { login } = require("./login");

router.post("/login", login);

//* ------------ Forgot Password ------------

const { forgotPassword } = require("./forgotPassword");
router.post("/forgotPassword", forgotPassword);

//* ------------ sendUserdata Password ------------

const { sendUserData } = require("./sendUserData");
router.post("/sendUserData", sendUserData);

//* ------------ Change  Password ------------

const { changePassword } = require("./changePassword");
router.post("/changePassword/:email", changePassword);

//* ------------ Activation Route ------------

const { activateUser } = require("./activateUser");
//* router.post("/user/:hash", acitvateUser);
router.post("/activate/user/:_id", activateUser);

//* ------------ Registration Route ------------ Protected

const { registration } = require("./registration");
router.post("/registration", utils.authMiddleware, registration);

//* ------------ Dashboard Route ------------ Protected

const { dashboard } = require("./registration");
router.post("/dashboard", utils.authMiddleware, registration);

//* ------------ LogoutRoute ------------

const { logout } = require("./logout");
router.post("/logout", logout);

//* ------------ Exporting here------------

module.exports = router;

//! ------------ Testing Route ------------

// router.post("/protected", utils.authMiddleware, (req, res) => {
//   console.log("Status : ", res.status);

//   if (res.status == 200) {
//     console.log("Protected route can be accessed ");
//     res.status(200).json({ access: true });
//   }
// });
