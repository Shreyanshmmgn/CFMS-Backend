const mongoose = require("mongoose");
require("dotenv").config();

mongoose.createConnection(
  process.env.DATABASE_ACCESS1,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database coneected! : 1");
  }
);

mongoose.createConnection(
  process.env.DATABASE_ACCESS2,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database coneected! : 2");
  }
);

// var conn = mongoose.createConnection(
//   "mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]",
//   options
// );
