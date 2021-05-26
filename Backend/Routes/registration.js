const User = require("../Models/userModel");

exports.registration = async (req, res) => {
  console.log("Inside Registration : ", req.body);

  if (Object.keys(req.body).length === 0) {
    res.status(201).json({ msg: "No data found ", success: true });
    return;
  }

  console.log(email);

  let { email } = req.body;
  const userData = req.body;

  try {
    await User.findOne({ email }).then(async (user) => {
      var newItem = user;
      newItem.userData = userData;
      newItem.save();
      res
        .status(200)
        .json({ message: " User data updated ! registration done", finalPath });
    });
  } catch (e) {
    res.status(422).json({ message: "Some error occured" });
  }
};
