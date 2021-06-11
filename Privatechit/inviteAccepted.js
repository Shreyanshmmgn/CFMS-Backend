const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.inviteAccepted = async (req, res) => {
  const { uid } = req.params;
  const uidCurrentMember = req.cookies.uid; // Uid of new member that will be added
  let privateChitData = {};
  let memberDetails = {};
  let roundDetails = {};
  console.log(uid);
  try {
    await User.findOne({ uid }).then(async (user) => {
      console.log(user.privaChitData);
      if (user.privaChitData.length > 1) {
        chitData = user.privaChitData;
        memberDetails = user.memberDetails;
        roundDetails = user.roundDetails;
      }
    });
    await User.findOneAndUpdate({ uidCurrentMember }).then(async (user) => {
      user.memberDetails = memberDetails;
      user.privateChitData = privateChitData;
      user.roundDetails = roundDetails;
      console.log("New member : ", user);
      user.save();
      res.status(200).json({
        message: " User data updated ! Member Added successfully ",
        success: true,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(422).json({ message: "Some error occured" });
  }
};
