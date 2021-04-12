const utils = require("../functionLib/util");

exports.activateUser = async (req, res) => {
  {
    const { hash } = req.params;
    try {
      const user = await PendingUser.find({ _id: hash });
      const pendingUser = new User({ ...user.data });
      await pendingUser
        .save()
        .then((user) => {
          console.log(user);
          //   const id = user._id;
          const jwt = utils.issueJWT(user);
          res.status(200).json({
            success: true,
            user: user,
            token: jwt.token,
            expiersIn: jwt.expires,
          });
        })
        .catch((err) => console.log(err));

      await user.remove();

      //   res.json({ message: `User ${pendingUser.userName} has been activated` });
    } catch {
      res.status(422).send("User cannot be activated!");
    }
  }
};
