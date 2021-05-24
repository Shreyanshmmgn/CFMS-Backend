const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.login = (req, res, next) => {
  {
    let userRegistered = false;
    const email = req.body.email;
    console.log(email);
    User.findOne({ email })
      .then((user) => {
        // console.log("User  : ", user.name);
        if (!user) {
          console.log("Wong password - 1");
          res.status(401).json({ success: false, msg: "User not found !" });
        } else {
          const isValid = utils.validPassword(
            req.body.password,
            user.hash,
            user.salt
          );
          if (isValid) {
            //
            //
            //
            //
            //
            if (user.userData.name) userRegistered = true;
            else userRegistered = false;
            console.log(
              "User is resgitered : ",
              userRegistered,
              " : ",
              user.userData.name
            );
            const tokenObj = utils.issueJWT(user);
            console.log(Date(new Date().getTime() + 1000 * 1000));
            res.status(202).cookie("token", tokenObj.token, {
              path: "/",
              httpOnly: true,
              secure: true,
              expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            });
            // .json({ userRegistered: true });
            res
              .status(202)
              .cookie("Expires", tokenObj.expires, {
                path: "/",
                httpOnly: true,
                secure: true,
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              })
              .json({ userRegistered: true });
            //
            //
            //
            //
            //
          } else {
            console.log("Wong password - 2");
            res.status(401).json({
              success: false,
              msg: "Wrong password entered!!",
            });
          }
        }
      })
      .catch((err) => next(err));
  }
};
