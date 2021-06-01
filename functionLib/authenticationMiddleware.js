const jsonwebtoken = require("jsonwebtoken");

require("dotenv").config();

const authMiddleware = (req, res, next) => {
  console.log(req.cookies);
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

exports.authMiddleware = authMiddleware;
