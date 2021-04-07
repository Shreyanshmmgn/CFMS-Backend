const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(
  process.env.DATABASE_ACCESS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database coneected!");
  }
);
