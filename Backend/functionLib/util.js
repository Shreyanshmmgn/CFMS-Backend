const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const pathToPubKey = path.join(__dirname, "..", "id_rsa_pub.pem");

const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

const algorithm = "aes192";
const password = "Hey you this is password";
const key = crypto.scryptSync(password, "salt", 24); //creating key
let iv;

// Function to encrypt data
const encryptdata = (data) => {
  let text = data;

  iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  console.log(encrypted);

  fs.writeFileSync(__dirname + "/data.pem", iv);
  return encrypted;
};

// Function to decrypt data
const decryptData = (encryptedData, iv) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted =
    decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8");
  console.log(decrypted);
  return decrypted;
};

function validPassword(password, hash, salt) {
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

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

const authMiddleware = (req, res, next) => {
  const tokenParts = req.headers.authorization.split(" ");
  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    //* If we are here the token verified
    //* will implment json web token verification here
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        afflgorithms: "RS256",
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

module.exports.encryptdata = encryptdata;
module.exports.decryptData = decryptData;
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
