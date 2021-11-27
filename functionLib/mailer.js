const nodeMailer = require("nodemailer");

sendConfirmationEmail = ({ email, _id }) => {
  return new Promise((res, rej) => {
    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dnotdevil@gmail.com",
        pass: "IronManIsBestAvenger@1",
        // util.decryptData(process.env.GOOGLE_PASSWORD, process.env.IV)
      },
    });
    const message = {
      from: process.env.GOOGLE_USER,
      to: email,
      subject: "CFMS - Activation Link",
      html: `
        <h3> Hello ${email} </h3>
        <p>Thank you for registering into our Application. Just one last step left...</p>
        <p>To activate your account please follow this link: <a target="_" href="http://localhost:3000/api/activate/user/${_id}">http://localhost:3000/api/activate </a></p>
        <p>Cheers</p>
        <p>CFMS</p>
      `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        console.log(info);
        res(info);
      }
    });
  }).catch((err) => {
    console.log(err);
  });
};

changePasswordMail = ({ email }) => {
  new Promise(async (res, rej) => {
    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dnotdevil@gmail.com",
        pass: "IronManIsBestAvenger@1",
        // util.decryptData(process.env.GOOGLE_PASSWORD, process.env.IV)
      },
    });

    const message = {
      from: "dnotdevil@gmail.com",
      to: email,
      subject: "CFMS - Forgot Password Link",
      html: `
        <h3> Hello ${email} </h3>
        <p>To change your password  click on the below mentioned link</p>
        <p> <a target="_" href="http://localhost:3000/api/changePassword/${email}">http://localhost:3000/api//forogtPassword</a></p>
        <p>Regards</p>
        <p>CFMS</p>
      `,
    };

    await transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        console.log(info);
        res(info);
      }
    });
    console.log("Forgot password Mail send  !!");
  }).catch((err) => {
    console.log("Node mailer error : ", err);
  });
};

addMemberMail = ({ email, uid, name }) => {
  // Send a pending request cookie
  new Promise((res, rej) => {
    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dnotdevil@gmail.com",
        pass: "IronManIsBestAvenger@1",
        // util.decryptData(process.env.GOOGLE_PASSWORD, process.env.IV)
      },
    });
    const message = {
      from: process.env.GOOGLE_USER,
      to: email,
      subject: "Join New Private Club",
      html: `
        <h3> Hello ${email} you are invited by ${name} to join a private club. How lucky 🤩 </h3>
        <p> Please click on the below link to join</p>
        <p> <a target="_" href="http://localhost:3000/api/acceptInvite/${uid}">Accept Invite</a></p>
        <p>Regards</p>
        <p>CFMS</p>
      `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        console.log(info);
        res(info);
      }
    });
    console.log("Forgot password Mail send  !!");
  });
};

exports.sendConfirmationEmail = sendConfirmationEmail;
exports.changePasswordMail = changePasswordMail;
exports.addMemberMail = addMemberMail;
