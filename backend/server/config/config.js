require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: "guts0912",
    database: "equitation",
    host: process.env.HOST,
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: process.env.USERNAME,
    password: "guts0912",
    database: "equittion",
    host: process.env.HOST,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: process.env.USERNAME,
    password: "guts0912",
    database: "equitation",
    host: process.env.HOST,
    dialect: "postgres",
    operatorsAliases: false
  }
};
