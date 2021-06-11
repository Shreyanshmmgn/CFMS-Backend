const User = require("../Models/userModel");
const { addMemberMail } = require("../functionLib/mailer");

exports.addNewMembers = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(201).json({ msg: "No data found ", success: true });
    return;
  }

  let uid = req.cookies.uid;
  let newMembers = req.body;

  newMembers.map(async (mem) => {
    let emailId = mem.emailId;
    await addMemberMail({ email: emailId });
  });

  try {
    await User.findOneAndUpdate({ uid }).then(async (user) => {
      user.memberDetails.push(newMembers);
      user.save();
      res.status(200).json({
        message: " User data updated ! private chit made succeesfully ",
        success: true,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(422).json({ message: "Some error occured" });
  }
};
