const mongoose = require("mongoose");

const schema = mongoose.Schema;

const pendingEmailsForVerification = new schema({
  email: {
    // Email of the user
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model(
  "pendingRequests",
  pendingEmailsForVerification
);
