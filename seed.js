"use strict";

const database = require("./api/database/database");
const { blue, red } = require("chalk");
const User = require("./api/database/models/Users");

// const UserSample = [
//   {
//     email: "asandhu@hapiTest.com",
//     password: "Password123!",
//   },
// ];

const seed = async () => {
  await database.sync({ force: true });

  //this seeds the database
  // await Promise.all();

  console.log(blue("Seeding success!"));
  database.close();
};

seed().catch((err) => {
  console.error(red("Something went wrong!"));
  console.error(err);
  database.close();
});
