exports.activateUser = async (req, res) => {
  const { _id } = req.params;
  console.log(" Request form axios made  ");
  try {
    await pendingUser.findOne({ _id }).then(async (user) => {
      const { _id, userName, email, salt, hash, date, __V } = user;

      const newUser = new User({ _id, userName, email, salt, hash, date, __V });
      console.log("New USer : ", newUser);

      await newUser
        .save()
        .then((user) => {
          res.json({
            success: true,
            user: user,
          });
        })
        .catch((err) => console.log(err));
    });

    await pendingUser.findOne({ _id }).deleteOne();
  } catch (err) {
    console.log(err);
    res.status(422).send("User cannot be activated!");
  }
};

//   const { hash } = req.params;
//   try {
//     const user = await PendingUser.find({ _id: hash });
//     const pendingUser = new User({ ...user.data });
//     await pendingUser
//       .save()
//       .then((user) => {
//         console.log(user);
//         res.status(200).json({
//           success: true,
//         });
//       })
//       .catch((err) => console.log(err));

//     await user.remove();
//   } catch {
//     res.status(422).send("User cannot be activated!");
//   }
// }

//! This code is working didnt tested above commented code

// , async (req, res) => {
//   const { _id } = req.params;
//   console.log(" Request form axios made  ");
//   try {
//     await pendingUser.findOne({ _id }).then(async (user) => {
//       const { _id, userName, email, salt, hash, date, __V } = user;

//       const newUser = new User({ _id, userName, email, salt, hash, date, __V });
//       console.log("New USer : ", newUser);

//       await newUser
//         .save()
//         .then((user) => {
//           //   const id = user._id;
//           res.json({
//             success: true,
//             user: user,
//           });
//         })
//         .catch((err) => console.log(err));
//     });

//     await pendingUser.findOne({ _id }).deleteOne();
//   } catch (err) {
//     console.log(err);
//     res.status(422).send("User cannot be activated!");
//   }
// }
