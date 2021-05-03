const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.login = (req, res, next) => {
  {
    let userRegistered = false;
    const email = req.body.email;
    User.findOne({ email })
      .then((user) => {
        
        // console.log("User  : ", user);
        if (!user) {
          console.log("Wong password - 1");
          res.status(401).json({ success: false, msg: "User not found !" });
        }
        const isValid = utils.validPassword(
          req.body.password,
          user.hash,
          user.salt
        );
        if (isValid) {
          if (user.userData.name) userRegistered = true;
          else userRegistered = false;
          console.log(
            "User is resgitered : ",
            userRegistered,
            " : ",
            user.userData.name
          );
          const tokenObj = utils.issueJWT(user);
          res.status(200).json({
            success: true,
            user: user,
            token: tokenObj,
            msg: "User found!!",
            userRegistered: userRegistered,
          });
          // .then((user) => {});
        } else {
          console.log("Wong password - 2");
          res.status(401).json({
            success: false,
            msg: "Wrong password entered!!",
          });
        }
      })
      .catch((err) => next(err));
  }
};
