exports.register = (server, options) => {
  const db = require("./database");
  db.sync().then(() => {
    console.log(`Database Synced`);
  });
};
exports.pkg = {
  name: "database",
};
