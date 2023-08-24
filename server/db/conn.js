const Sequelize = require("sequelize");
const config = {};

//ak removing all SQL statements, way too much noise in seeing console logs
config.logging = false;

if (process.env.QUIET) {
  config.logging = false;
}
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5433/stackathon.db",
  config
);

module.exports = conn;
