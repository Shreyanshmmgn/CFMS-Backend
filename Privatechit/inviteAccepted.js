const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.inviteAccepted = async (req, res) => {
  const { uid } = req.params;
  const uidCurrentMember = req.cookies.uid; // Uid of new member that will be added
  let privateChitData;
  let memberDetails;
  let roundDetails;
  try {
    await User.findOne({ _id: uid }).then(async (user) => {
      privateChitData = user.privateChitData;
      memberDetails = user.memberDetails;
      roundDetails = user.roundDetails;
    });
    await User.findOne({ _id: uidCurrentMember }).then(async (user2) => {
      user2.memberDetails = memberDetails;
      user2.privateChitData = privateChitData;
      user2.roundDetails = roundDetails;
      user2.save();
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
