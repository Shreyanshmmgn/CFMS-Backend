const User = require("../Models/userModel");

exports.privateChitRegistration = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(201).json({ msg: "No data found ", success: true });
    return;
  }

  let uid = req.cookies.uid;
  let privateChitData = req.body;
  privateChitData.chitType = "Private";
  privateChitData.memberType = "Owner";

  console.log("Private Chit data : ", privateChitData);

  try {
    await User.findOneAndUpdate({ uid }).then(async (user) => {
      var newItem = user;
      newItem.privateChitData = privateChitData;
      await newItem.save();
      // var newItem = user;
      // newItem.privateChitData = privateChitData;
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
