const User = require("../Models/userModel");
const path = require("path");

exports.registration = async (req, res) => {
  let { email } = req.body;
  const userData = req.body;
  console.log(userData);
  const image = req.file;
  const finalPath = `uploads/${image.filename}`;
  try {
    await User.findOne({ email }).then(async (user) => {
      var newItem = user;
      newItem.userData = userData;
      newItem.userData.image = finalPath;
      newItem.save();
      res
        .status(200)
        .json({ message: " User data updated ! registration done", finalPath });
    });
  } catch (e) {
    res.status(422).json({ message: "Some error occured" });
  }
};
