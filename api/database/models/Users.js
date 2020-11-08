"use strict";

const Sequelize = require("sequelize");
const database = require("../database");

const User = database.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = User;
