// Creating express application
const express = require("express");
const app = express();

// Middleware to parse Json
app.use(express.json());
// Middleware to parse incoming urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Dotenv to let us access enviourmnet variable
const dotenv = require("dotenv");
dotenv.config();

// To let us make req for one site to another and one localhost to another
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://main.d27jkfy1s4oxp5.amplifyapp.com/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//To use cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Incluing database
require("./Database/database");

// Including all the routes
const routerPath = require("./Routes/router");

app.use(("/", routerPath));

// Server will be listing to port : 5000
app.listen(process.env.PORT || 5000, () =>
  console.log("  Server is running at port : 5000")
);
