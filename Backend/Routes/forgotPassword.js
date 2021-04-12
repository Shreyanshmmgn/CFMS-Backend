const User = require("../Models/userModel");
const pendingUser = require("../Models/pendingRequests");
const { changePasswordMail } = require("../functionLib/mailer");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const checkUser = await User.findOne({ email });
    const checkPendingUser = await pendingUser.findOne({ email });
    // const checkUser = false;
    // const checkPendingUser = false;

    if (checkPendingUser) {
      return res.status(422).json({
        success: false,
        msg: " User had not verified this email id ",
      });
    } else if (checkUser) {
      // 422 for unprocessable entity

      await changePasswordMail({
        email: email,
      });
      return res.status(200).json({ success: true, msg: " User found " });
    } else {
      console.log("No user found with this email id !! ");
      return res
        .status(422)
        .json({ success: false, msg: " No user with this id  " });
    }
  } catch (e) {
    res.status(422).send(e.message);
  }
};
