const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pathToKey = path.join(__dirname, "..", "priv.pem");
const pathToPubKey = path.join(__dirname, "..", "pub.pem");

const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

function validPassword(password, hash, salt) {
  // ----- Had to change pbkdf2Sync in future -----

  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  console.log("Tokens sent - util.js");

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

const authMiddleware = (req, res, next) => {
  console.log("Checking if token are right !!");
  if (req.cookies.token == undefined) {
    console.log("Cookes is not there !!!!");
    return res
      .status(401)
      .json({ success: false, msg: "You are not authoriezed !" });
  }
  const tokenParts = req.cookies.token.split(" ");
  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    //* If we are here the token verified
    //* will implment json web token verification here
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: "RS256",
      });
      req.jwt = verification;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, msg: "You are not authoriezed !" });
    }
  } else {
    res.status(401).json({ success: false, msg: "You are not authoriezed !" });
  }
};

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;

//
//
//
//

// const PRIV_KEY = process.env.PRIV_KEY;
// const PUB_KEY = process.env.PUB_KEY;

// const algorithm = "aes192";
// const password = "Hey you this is password";

// module.exports.encryptdata = encryptdata;
// module.exports.decryptData = decryptData;
// const key = crypto.scryptSync(password, "salt", 24); //creating key
// // let iv;
// let iv = crypto.randomBytes(16);

// // Function to encrypt data
// const encryptdata = (data) => {
//   fs.writeFileSync(__dirname + "/data.pem", iv);
//   let text = data;
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
//   console.log(encrypted);
//   return encrypted;
// };

// // Function to decrypt data
// const decryptData = (encryptedData, iv) => {
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
//   var decrypted =
//     decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8");
//   console.log(decrypted);
//   return decrypted;
// };
