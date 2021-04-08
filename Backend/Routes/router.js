const express = require("express");
const router = express.Router();
const utils = require("../functionLib/util");

const User = require("../Models/userModel");
const pendingUser = require("../Models/pendingRequests");

router.get("/", (req, res) => {
  res.send("Routing workss!! lets get started");
});

// ------------ Signup Route ------------
const { signup } = require("./signup");

router.post("/signup", signup);

// ------------ Login Route ------------
const { login } = require("./login");

router.post("/login", login);

// ------------ Activation Route ------------

// const { acitvateUser } = require("./activateUser");
// router.post("/user/:hash", acitvateUser);
router.get("/activate/user/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log(" Hash : ", _id);
  try {
    await pendingUser.findOne({ _id }).then(async (user) => {
      const { _id, userName, email, salt, hash, date, __V } = user;

      const newUser = new User({ _id, userName, email, salt, hash, date, __V });
      console.log("New USer : ", newUser);

      await newUser
        .save()
        .then((user) => {
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

    await pendingUser.findOne({ _id }).remove();
  } catch (err) {
    console.log(err);
    res.status(422).send("User cannot be activated!");
  }
});

module.exports = router;
