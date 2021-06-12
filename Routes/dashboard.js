// To check if any pending requests or not !!
const User = require("../Models/userModel");

exports.dashboard = async (req, res) => {
  let uid = req.cookies.uid;

  console.log("Private Chit data : ", req.body);
  const { investment, wallet, bankDetails } = req.body;

  try {
    await User.findOneAndUpdate({ uid }).then(async (user) => {
      var newItem = user;
      newItem.investmentDetails = investment;
      newItem.wallet = wallet;

      newItem.bankDetails = bankDetails;

      await newItem.save();

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
// {
//   investment: {
//     totalMoneyInvested: '2000',
//     netIntrestEarned: '0',
//     cyclesRemaining: '1',
//     nextBidDate: '21-8-2021'
//   },
//   wallet: { balance: '30000' },
//   bankDetails: {
//     cardType: 'Visa',
//     cardHolderName: 'Shreyansh Mamgain',
//     cardNumber: '333-6666-111-9980',
//     expiryDate: '23-11-2029'
//   }
// }
