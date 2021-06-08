const mongoose = require("mongoose");

const schema = mongoose.Schema;

const privateChit = new schema({
  managerName: {
    type: String,
    required: true,
  },
  totalMembers: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  timePeriod: {
    type: String,
  },
  fundSize: {
    type: Number,
  },
  commission: {
    type: Number,
  },
  startDate: {
    type: String,
  },
  maximumBid: {
    type: Number,
  },
  monthlyInstallment: {
    type: Number,
  },
  minimumInstallment: {
    type: Number,
  },
});
// Document

module.exports = mongoose.model("privateChitData", privateChit);
