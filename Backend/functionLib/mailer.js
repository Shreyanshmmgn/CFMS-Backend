const nodeMailer = require("nodemailer");
const fs = require("fs");

exports.sendConfirmationEmail = ({ email, _id }) => {
  const iv = fs.readFileSync(__dirname + "/data.pem", "utf-8");
  return new Promise((res, rej) => {
    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
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
        <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/activate/user/${_id}">${process.env.DOMAIN}/activate </a></p>
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
    console.log("Mail send  !!");
  });
};
