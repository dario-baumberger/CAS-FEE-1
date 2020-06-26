"use strict";

import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import bodyParser from "body-parser";
import { notesRoutes } from "./routes/notesRoutes.js";

const app = express();
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
    src: path.resolve("src/sass"),
    dest: path.resolve("public/css"),
    debug: true,
    outputStyle: "compressed",
    prefix: "/css",
  })
);
app.use(express.static("public"));
app.use("/api/notes", notesRoutes);

app.get("/", function (req, res) {
  res.sendFile("public/html/index.html", { root: "." });
});

app.use(function (req, res, next) {
  res.sendFile("public/html/error.html", { root: "." });
});

app.listen(port, () =>
  console.log(`Example app listening at http://${host}:${port}`)
);
