const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.POSTGRES);

async function openConnection() {
  await sequelize.sync({ alter: true });
  return sequelize.authenticate();
}

function closeConnection() {
  return sequelize.close();
}

async function startDB() {
  try {
    await openConnection();
    console.log("Connection to Database has been established successfully!");
  } catch (err) {
    await closeConnection();
    console.error("Unable to connect to the database:", err);
  }
}

module.exports = { startDB, sequelize };
