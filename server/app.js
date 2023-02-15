const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const usersRouter = require("./app/api/routes/users");
const profilesRouter = require("./app/api/routes/profiles");
const { handleError } = require("./app/api/errors/helpers/error");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(logger("combined", { stream: accessLogStream }));

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB start connect...");
  })
  .catch((err) => console.log("MongoDB something wrong...", err))
  .finally(() => console.log("MongoDB is connected!!!"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", usersRouter);
app.use("/api/profiles", profilesRouter);

app.use(handleError);
app.listen(process.env.PORT, () => {
  console.log(`Server Running at port ${process.env.PORT}`);
});
module.exports = app;
