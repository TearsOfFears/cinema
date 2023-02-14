const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const usersRouter = require("./app/api/routes/Users");
const { handleError } = require("./app/api/errors/helpers/error");
// const auth = require("./app/api/middlewares/auth")();
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
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", usersRouter);

app.use(handleError);
app.listen(process.env.PORT, () => {
  console.log(`Server Running at port ${process.env.PORT}`);
});
module.exports = app;
