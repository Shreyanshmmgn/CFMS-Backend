const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.changePassword = async (req, res) => {
  const { password } = req.body;
  const { email } = req.params;
  try {
    await User.findOne({ email }).then(async (user) => {
      console.log(user);
      const saltHash = utils.genPassword(password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;

      user.salt = salt;
      user.hash = hash;
      user.save((err) => {
        console.log(err);
      });
      res.status(200).json({ message: " passcword changed" });
    });
  } catch (e) {
    res.status(422).send(e.message);
  }
};
