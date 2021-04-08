const User = require("../Models/userModel");

const test = async () => {
  try {
    const email = "smmgn7934@gmail.co1";
    console.log("Before user found or not! : ");
    // await User.find({ email });
    const checkUser = User.findOne({ email });
    // const checkPendingUser = User.find({ email });
    if (checkUser) {
      console.log("Hello");
    } else {
      console.log("Not found");
    }
  } catch (error) {
    console.log(error);
  }
};

test();
