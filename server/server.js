require("rootpath")();

const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/errors");
const express = require("express");
const app = express();

//server config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//JWT for securing API routes
app.use(jwt());

//error handler
app.use(errorHandler);

//routes
app.use("/users", require("./users/users.controller"));

//server setup for start
const server_port = process.env.NODE_ENV === "production" ? 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on : " + port);
});
