const User = require("../Models/userModel");

exports.investment = async (req, res, next) => {
  let uid = req.cookies.uid;

  try {
    await User.findOneAndUpdate({ uid }).then(async (user) => {
      var newItem = user;
      newItem.investDetails = req.body;
      await newItem.save();

      res.status(200).json({
        message: " User data updated ! private chit made succeesfully ",
        success: true,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(422).json({ message: "Some error occured" });
  }
};
