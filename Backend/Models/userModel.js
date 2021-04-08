const mongoose = require("mongoose");

const schema = mongoose.Schema;

const signUpTemplate = new schema({
  userName: {
    // Name of the user
    type: String,
    required: true,
  },
  email: {
    // Email of the user
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    // Constains our password
    type: String,
    required: true,
  },
  salt: {
    // Contains salt to decrypt the hash
    type: String,
    required: true,
  },
  date: {
    // Timestamp when the user got registerd
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("userData", signUpTemplate);
