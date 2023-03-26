const express = require("express");
const fs = require("fs");
const path = require("path");
const userRouter = require("./app/api/routes/user");
const bookingRouter = require("./app/api/routes/booking");
const profileRouter = require("./app/api/routes/profiles");
const cinemaRouter = require("./app/api/routes/cinema");
const movieRouter = require("./app/api/routes/movie");
const cinemaHallRouter = require("./app/api/routes/cinema-hall");
const showRouter = require("./app/api/routes/show");
const multer = require("multer");
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

// app.get("/", express.static(path.join(__dirname, "./images")));

// const upload = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

// app.post("/upload", upload.single("file"), (req, res) => {
//   const tempPath = req.file.path;
//   const targetPath = path.join(__dirname, "./uploads/image.png");
//   if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//     fs.rename(tempPath, targetPath, (err) => {
//       if (err) return handleError(err, res);
//
//       res.status(200).contentType("text/plain").end("File uploaded!");
//     });
//   } else {
//     fs.unlink(tempPath, (err) => {
//       if (err) return handleError(err, res);
//       res
//         .status(403)
//         .contentType("text/plain")
//         .end("Only .png files are allowed!");
//     });
//   }
// });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const routers = {
  user: userRouter,
  profile: profileRouter,
  cinema: cinemaRouter,
  movie: movieRouter,
  cinemaHall: cinemaHallRouter,
  show: showRouter,
  booking: bookingRouter,
};
for (route in routers) {
  app.use(`/api/${route}`, routers[route]);
}
app.use(handleError);
app.listen(process.env.PORT, () => {
  console.log(`Server Running at port ${process.env.PORT}`);
});
module.exports = app;
