const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userChitDetails = new schema({
  uid: {
    type: String,
    required: true,
  },
});
// Document

module.exports = mongoose.model("userChitData", userChitDetails);
