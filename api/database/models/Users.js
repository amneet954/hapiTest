"use strict";

const crypto = require("crypto");
const Sequelize = require("sequelize");
const database = require("../database");

const User = database.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      len: {
        isAlphanumeric: true,
        args: [8, 20],
        msg: "The password length should be between 7 and 42 characters.",
      },
      get() {
        return () => this.getDataValue("password");
      },
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
});

module.exports = User;

User.createSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPass = (text, salt) => {
  return crypto
    .createHash("RSA-SHA256")
    .update(text)
    .update(salt)
    .digest("hex");
};

const createSaltPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.createSalt();
    user.password = User.encryptPass(user.password, user.salt());
  }
};

User.beforeCreate(createSaltPassword);
User.beforeUpdate(createSaltPassword);

User.prototype.checkPassword = function (userPassword) {
  return User.encryptPass(userPassword, this.salt()) === this.password;
};
