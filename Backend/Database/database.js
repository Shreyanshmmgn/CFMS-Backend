const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_ACCESS1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected! 1"))
  .catch((err) => console.log(err));
