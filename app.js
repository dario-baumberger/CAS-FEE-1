"use strict";

const express = require("express");
const sassMiddleware = require("node-sass-middleware");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("./routes/routes.index.js")(app);
let apiRoutes = require("./routes/routes.api.js");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.set("view engine", "html");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public/css"),
    debug: true,
    outputStyle: "compressed",
    prefix: "/css",
  })
);
app.use(express.static("public"));
app.use("/api", apiRoutes);
mongoose.connect("mongodb://localhost/", { useNewUrlParser: true });
let db = mongoose.connection;

if (!db) {
  console.log("Error connecting db");
} else {
  console.log("db connected successfully");
}

app.use(function (req, res, next) {
  res.sendFile("public/error.html", { root: "." });
});

server.listen(port, () =>
  console.log(`Example app listening at http://${host}:${port}`)
);
