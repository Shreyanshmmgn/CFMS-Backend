const User = require("../Models/userModel");
const { changePasswordMail } = require("../functionLib/mailer");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      
      // 422 for unprocessable entity

      await changePasswordMail({
        email: email,
      });
      return res.status(200).json({ success: true, msg: " User found " });
    } else {
      return res
        .status(422)
        .json({ success: false, msg: " No user with this id  " });
    }
  } catch (e) {
    res.status(422).send((e.message = "Some error occured"));
  }
};
