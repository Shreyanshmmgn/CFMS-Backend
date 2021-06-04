const User = require("../Models/userModel");

exports.registration = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(201).json({ msg: "No data found ", success: true });
    return;
  }

  let { email } = req.body;
  const userData = req.body;
  console.log("User Data : ", userData);

  try {
    await User.findOne({ email }).then(async (user) => {
      var newItem = user;
      newItem.userData = userData;
      newItem.save();
      res.status(200).json({
        message: " User data updated ! registration done",
        success: true,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(422).json({ message: "Some error occured" });
  }
};
