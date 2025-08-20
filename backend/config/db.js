const { Sequelize } = require("sequelize");
require("dotenv").config();

const {
  DATABASE_URL,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  NODE_ENV
} = process.env;

let sequelize;

if (DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false
    }
  });
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST || "localhost",
    port: DB_PORT ? Number(DB_PORT) : 5432,
    dialect: "postgres",
    logging: NODE_ENV === "development" ? console.log : false,
  });
}

module.exports = sequelize;
