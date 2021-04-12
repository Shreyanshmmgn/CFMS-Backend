const User = require("../Models/userModel");
const utils = require("../functionLib/util");
var multer = require("multer");

exports.registration = async (req, res) => {
  // {
  //   name,
  //   email,
  //   phoneNumber,
  //   currentAddress,
  //   permanentAdress,
  //   state,
  //   pincode,
  //   dob,
  //   martialStatus,
  //   occupation,
  //   monthlyIncome,
  //   gender,
  //   picture,
  // }
  const userData = req.body;

  try {
    await User.findOne({ email }).then(async (user) => {
      console.log(user);
      var newItem = new Item();
      newItem.userData = userData;
      newItem.userData.picture.contentType = "image/png";
      newItem.save();
      res.status(200).json({ message: " passcword changed" });
    });
  } catch (e) {
    res.status(422).send(e.message);
  }
};
