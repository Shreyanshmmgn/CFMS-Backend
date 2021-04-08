const express = require("express");
const router = express.Router();

const User = require("../Models/userModel");
const pendingUser = require("../Models/pendingRequests");

const { signup } = require("./signup");
const { login } = require("./login");

router.get("/", (req, res) => {
  res.send("Routing workss!! lets get started");
});

// ------------ Signup Route ------------

router.post("/signup", signup);

// ------------ Login Route ------------

router.post(login);

// ------------ Activation Route ------------

router.get("/activate/user/:hash", async (req, res) => {
  const { hash } = req.params;
  console.log(" Hash : ", hash);
  try {
    // const user = await PendingUser.find({ _id: hash });
    // const pendingUser = new User({ ...user.data });
    // await pendingUser.save();
    // await user.remove();

    res.json({ message: `User ${hash} has been activated` });
  } catch {
    res.status(422).send("User cannot be activated!");
  }
});

module.exports = router;
