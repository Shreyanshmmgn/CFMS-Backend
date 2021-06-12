// Creating express application
const express = require("express");
const app = express();

// Middleware to parse Json
app.use(express.json());
// Socket io setup

// Middleware to parse incoming urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Dotenv to let us access enviourmnet variable
const dotenv = require("dotenv");
dotenv.config();

// To let us make req for one site to another and one localhost to another
const cors = require("cors");
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//To use cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Adding socket .io and http

// Incluing database
require("./Database/database");

// Including all the routes
const routerPath = require("./Routes/router");

app.use(("/", routerPath));

// Server will be listing to port : 5000
app.listen(process.env.PORT || 5000, () =>
  console.log("  Server is running at port : 5000")
);
