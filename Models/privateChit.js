const mongoose = require("mongoose");

const schema = mongoose.Schema;

const privateChit = new schema({
  managerName: {
    type: String,
    required: true,
  },
  totalMembers: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: String,
    required: true,
  },
  timePeriod: {
    type: String,
    required: true,
  },
  fundSize: {
    type: Date,
    default: Date.now,
  },
  commission: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  maximumBid: {
    type: Date,
    default: Date.now,
  },
  monthlyInstallment: {
    type: Date,
    default: Date.now,
  },
  minimumInstallment: {
    type: Date,
    default: Date.now,
  },
});
// Document

module.exports = mongoose.model("privateChitData", privateChit);
