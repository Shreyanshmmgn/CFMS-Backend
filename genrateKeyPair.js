//! to  genrate public and private keys
const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits length
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.writeFileSync(__dirname + "/pub.pem", keyPair.publicKey);

  fs.writeFileSync(__dirname + "/priv.pem", keyPair.privateKey);
}
genKeyPair();
