require("dotenv").config();

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");

const app = express();

// Connecting to MongoDB
const db = require("./config/database");
db();

// Using middleware
app.use(cors());
app.use(logger);
app.use(cookieParser());

app.use(express.json());

// Using Routes
const routes = require("./routes/router");
app.use("/", routes);

// Using css & js files
app.use(express.static("public"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.redirect("/views/404");
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

// Using port provided in .env file
app.listen(process.env.PORT);
