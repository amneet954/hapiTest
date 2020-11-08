"use strict";

exports.register = (server, options) => {
  const database = require("./database");
  database.sync().then(() => {
    console.log(`Database Synced`);
  });
};
exports.pkg = {
  name: "database",
};
