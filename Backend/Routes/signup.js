const User = require("../Models/userModel");
const utils = require("../functionLib/util");
const pendingUser = require("../Models/pendingRequests");
const { sendConfirmationEmail } = require("../functionLib/mailer");

exports.signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    const checkPendingUser = await pendingUser.findOne({ email });
    // const checkUser = false;
    // const checkPendingUser = false;

    if (checkPendingUser || checkUser) {
      // 422 for unprocessable entity
      return res
        .status(422)
        .json({ success: false, msg: " User already exsists! " });
    }
    const saltHash = utils.genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newPUser = new pendingUser({ userName, email, salt, hash });

    console.log("New waiting user : ", newPUser);

    await sendConfirmationEmail({
      email: newPUser.email,
      _id: newPUser._id,
    });

    await newPUser.save();
    res.json({ message: "You have been registered. in pending requests" });
    console.log("You have been registered. in pending requests");
  } catch (e) {
    res.status(422).send(e.message);
  }
};
