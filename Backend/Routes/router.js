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

// ------------ Forgot Password ------------

const { forgotPassword } = require("./forgotPassword");
router.post("/forgotPassword", forgotPassword);

// ------------ Forgot Password ------------

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

    await pendingUser.findOne({ _id }).deleteOne();
  } catch (err) {
    console.log(err);
    res.status(422).send("User cannot be activated!");
  }
});

// ------------ Registration Route ------------
var multer = require("multer");
var fs = require("fs");
const upload = multer({ dest: "uploads/" });

const { registration } = require("./registration");
router.post("/registration", registration);

// (req, res) => {
//   console.log(req.file);
//   var tmp_path = req.file.path;

//   /** The original name of the uploaded file
//       stored in the variable "originalname". **/
//   var target_path = "uploads/" + req.file.originalname;

//   /** A better way to copy the uploaded file. **/
//   var src = fs.createReadStream(tmp_path);
//   var dest = fs.createWriteStream(target_path);
//   src.pipe(dest);
//   src.on("end", function () {
//     res.render("complete");
//   });
//   src.on("error", function (err) {
//     res.render("error");
//   });

module.exports = router;
