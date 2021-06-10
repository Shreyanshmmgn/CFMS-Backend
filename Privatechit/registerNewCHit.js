const User = require("../Models/userModel");

exports.privateChitRegistration = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(201).json({ msg: "No data found ", success: true });
    return;
  }

  let uid = req.cookies.uid;
  let privateChitData = req.body;
  privateChitData.chitType = "Private";

  console.log("Private Chit data : ", privateChitData);

  try {
    await User.findOneAndUpdate({ uid }).then(async (user) => {
      if (user.privateChitData.length > 1) {
        return res.status(400).json({
          message: "User cant make any more private chits for this month ",
          success: false,
        });
      }
      user.privateChitData.push(privateChitData);
      // var newItem = user;
      // newItem.privateChitData = privateChitData;
      user.save();
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
