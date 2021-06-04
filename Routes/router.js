const express = require("express");
const router = express.Router();
const utils = require("../functionLib/util");

//* ------------ Home Route ------------

router.post("/", (req, res) => {
  res.send("Routing workss!! lets get started");
});

//* ------------ Signup Route ------------
const { signup } = require("./signup");

router.post("/api/signup", signup);

//* ------------ Login Route ------------
const { login } = require("./login");

router.post("/api/login", login);

//* ------------ Forgot Password ------------

const { forgotPassword } = require("./forgotPassword");
router.post("/api/forgotPassword", forgotPassword);

//* ------------ Send User Data Route ------------

const { sendUserData } = require("./sendUserData");
router.post("/api/sendUserData", utils.authMiddleware, sendUserData);

//* ------------ Change  Password ------------

const { changePassword } = require("./changePassword");
router.post("/api/changePassword/:email", changePassword);

//* ------------ Activation Route ------------

const { activateUser } = require("./activateUser");
//* router.post("/user/:hash", acitvateUser);
router.post("/api/activate/user/:_id", activateUser);

//* ------------ Registration Route ------------ Protected

const { registration } = require("./registration");
router.post("/api/registration", utils.authMiddleware, registration);

//* ------------ Dashboard Route ------------ Protected

const { dashboard } = require("./registration");
router.post("/api/dashboard", utils.authMiddleware, registration);

//* ------------ LogoutRoute ------------

const { logout } = require("./logout");
router.post("/api/logout", logout);

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
