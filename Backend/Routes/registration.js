const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.registration = async (req, res) => {
  const { password } = req.body;
  const { email } = req.params;
  const mail = email + ".com";
  try {
    await User.findOne({ email }).then(async (user) => {
      console.log(user);
      console.log("Pass :", password);
      const saltHash = utils.genPassword(password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;

      console.log("salt : ", salt);
      user.salt = salt;
      user.hash = hash;
      user.save((err) => {
        console.log("user saved");
        console.log(err);
      });
      // await user.update(
      //   "eminem.shre@gmail.com",
      //   { salt: "1", hash: "2" },
      //   (err) => {
      //     if (err) throw err;
      //     console.log("1 document updated");
      //   }
      // );
      res.status(200).json({ message: " passcword changed" });
    });
  } catch (e) {
    res.status(422).send(e.message);
  }
};
