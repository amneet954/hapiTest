"use strict";

// establish a connection to your Postgres database here

const chalk = require("chalk");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");

console.log(chalk.blue("Opening database connection"));

// create the database instance
const database = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false,
});

module.exports = database;
