const express = require('express');
const mongoose = require("mongoose");
const logger = require('morgan');
const usersRouter = require('./app/api/routes/Users')
const { handleError } = require('./app/api/errors/helpers/error')
auth = require('./app/api/middlewares/auth')()
require("dotenv").config()
const app = express();

app.use(logger('dev'));

mongoose.connect(process.env.MONGO)
    .then(() => console.log('MongoDB start connect...'))
    .catch(err => console.log('MongoDB something wrong...',err))
    .finally(()=>console.log('MongoDB is connected!!!'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require('./app/api/middlewares/auth')()

app.use('/api/user', usersRouter);

app.use(handleError);
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
   res.render('error');
});
app.listen(process.env.PORT, () => {
  console.log(`Server Running at port ${process.env.PORT}`)
});
module.exports = app;
