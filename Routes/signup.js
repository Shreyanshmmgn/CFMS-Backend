const User = require("../Models/userModel");
const utils = require("../functionLib/util");
const pendingUser = require("../Models/pendingRequests");
const { sendConfirmationEmail } = require("../functionLib/mailer");

exports.signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    const checkPendingUser = await pendingUser.findOne({ email });
    console.log(email);

    // const checkUser = false;
    // const checkPendingUser = false;

    if (checkPendingUser || checkUser) {
      console.log("user cant be registered");
      // 422 for unprocessable entity
      return res
        .status(422)
        .json({ success: false, msg: " User already exsists! " });
    }
    console.log("user is new !!");
    const saltHash = utils.genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newPUser = new pendingUser({ userName, email, salt, hash });

    console.log("New waiting user : ", newPUser);

    await sendConfirmationEmail({
      email: newPUser.email,
      _id: newPUser._id,
    });
    console.log("Mail send successlufy signup");
    await newPUser.save();
    console.log("User is saved");
    res
      .status(200)
      .json({ message: "You have been registered please verify your mail" });
  } catch (e) {
    res.status(422).send(e.message);
  }
};
