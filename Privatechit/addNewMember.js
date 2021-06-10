const User = require("../Models/userModel");
const { changePasswordMail } = require("../functionLib/mailer");

exports.addNewMembers = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(201).json({ msg: "No data found ", success: true });
    return;
  }

  let uid = req.cookies.uid;
  let newMembers = req.body;

  console.log("Private Chit data : ", newMembers);
  // [
  //   {
  //     firstName: "Shyam Yadav ",
  //     emailId: "shyamyadav21099@gmail.com",
  //     Role: "Member",
  //     id: 447552,
  //   },
  //   { firstName: "asdasd", emailId: "adasd", id: 314685, Role: "Member" },
  //   {
  //     firstName: "Shreyansh ",
  //     emailId: "shreyansh17csu184@gmail.com",
  //     id: 456543,
  //     Role: "Member",
  //   },
  // ];
  newMembers.map(async (mem) => {
    console.log("email send to : ", mem.emailId);
    let emailId = mem.emailId;
    await changePasswordMail({ email: emailId });
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
