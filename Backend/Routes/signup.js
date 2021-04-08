const User = require("../Models/userModel");
const utils = require("../functionLib/util");
const pendingUser = require("../Models/pendingRequests");
const { sendConfirmationEmail } = require("../functionLib/mailer");

exports.signup = async (req, res) => {
  const { userName, email, password, status } = req.body;
  try {
    console.log("Before user found or not! : ", req.body.email);

    // const checkUser = await User.findOne({ email });
    // const checkPendingUser = await pendingUser.findOne({ email });
    const checkUser = false;
    const checkPendingUser = false;

    console.log("After user found or not!", checkPendingUser);

    if (checkPendingUser || checkUser) {
      // 422 for unprocessable entity
      return res
        .status(422)
        .json({ success: false, msg: " User already exsists! " });
    }
    console.log("Debug stat 1 : user is new !");
    const saltHash = utils.genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newPUser = new pendingUser({ email });
    newPUser.save().then((user) => {
      console.log(user);
    });

    console.log("New user in pending user database created : ", newPUser);

    await sendConfirmationEmail({
      email: newPUser.email,
      hash: newPUser._id,
    });

    const newUser = new User({
      userName: userName,
      email: email,
      hash: hash,
      salt: salt,
    });

    console.log(newUser);

    await newUser
      .save()
      .then((user) => {
        console.log(user);
        //   const id = user._id;
        const jwt = utils.issueJWT(user);
        res.json({
          success: true,
          user: user,
          token: jwt.token,
          expiersIn: jwt.expires,
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
