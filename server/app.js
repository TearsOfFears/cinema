const express = require("express");
const fs = require("fs");
const path = require("path");
// const mongoose = require("mongoose");
const userRouter = require("./app/api/routes/users");
const profileRouter = require("./app/api/routes/profiles");
const cinemaRouter = require("./app/api/routes/cinema");
const cityRouter = require("./app/api/routes/city");
const { handleError } = require("./app/api/errors/helpers/error");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const { startDB } = require("./app/db/connect");
const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(logger("tiny", { stream: accessLogStream }));
startDB();
// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log("MongoDB start connect...");
//   })
//   .catch((err) => console.log("MongoDB something wrong...", err))
//   .finally(() => console.log("MongoDB is connected!!!"));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

const routerArr = {
  user: userRouter,
  profile: profileRouter,
  cinema: cinemaRouter,
  city: cityRouter,
};
for (key in routerArr) {
  app.use(`/api/${key}`, routerArr[key]);
}
app.use(handleError);
app.listen(process.env.PORT, () => {
  console.log(`Server Running at port ${process.env.PORT}`);
});
module.exports = app;
