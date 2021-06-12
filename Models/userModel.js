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
  userData: {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    currentAddress: { type: String },
    permanentAdress: { type: String },
    state: { type: String },
    pincode: { type: String },
    dob: { type: String },
    martialStatus: { type: String },
    occupation: { type: String },
    monthlyIncome: { type: String },
    gender: { type: String },
    imageUrl: { type: String },
  },
  publicChitData: { type: Array, default: [] },
  privateChitData: {},
  memberDetails: { type: Array, default: [] },
  roundDetails: { type: Array, default: [] },
  investmentDetails: {
    totalMoneyInvested: { type: Number },
    netIntrestEarned: { type: Number },
    cyclesRemaining: { type: Number },
    nextBidDate: { type: String },
  },
  wallet: { balance: { type: Number } },
  bankDetails: {
    cardType: { type: String },
    cardHolderName: { type: String },
    cardNumber: { type: String },
    expiryDate: { type: String },
  },
});
// Document

module.exports = mongoose.model("userData", signUpTemplate);
