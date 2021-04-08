const nodeMailer = require("nodemailer");
const util = require("./util");

exports.sendConfirmationEmail = ({ email, hashedPassword }) => {
  console.log("Confirmin Email !!");
  return new Promise((res, rej) => {
    console.log("Before Transporter !!");
    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: "Hr26aj7934@srishti",
        // util.decryptData(process.env.GOOGLE_PASSWORD, process.env.IV)
      },
    });
    console.log("After Transporter !!", email, " : ", hashedPassword);
    const message = {
      from: process.env.GOOGLE_USER,
      to: email,
      subject: "CFMS - Activation Link",
      html: `
        <h3> Hello ${email} </h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/activate/user/${hashedPassword}">${process.env.DOMAIN}/activate </a></p>
        <p>Cheers</p>
        <p>CFMS</p>
      `,
    };
    console.log("After Message  !!");

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
