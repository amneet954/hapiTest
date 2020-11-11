"use strict";
const crypto = require("crypto");
const Sequelize = require("sequelize");
const database = require("../database");

const b64Encode = (obj) => {
  return Buffer.from(obj)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

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

User.generateSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = (text, salt) => {
  return crypto
    .createHash("RSA-SHA256")
    .update(text)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt());
  }
};
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

User.prototype.correctPassword = function (enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password;
};
