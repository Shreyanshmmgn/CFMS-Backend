const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.registration = async (req, res) => {
  const { email } = req.body;
  const userData = req.body;

  console.log(email);

  try {
    await User.findOne({ email }).then(async (user) => {
      var newItem = user;
      newItem.userData = userData;
      newItem.userData.picture.contentType = "image/png";
      console.log(newItem);
      newItem.save();
      res
        .status(200)
        .json({ message: " User data updated ! registration done" });
    });
  } catch (e) {
    res.status(422).send("Eroor");
  }
};
