const database = require("./api/database/database");
const { blue, red } = require("chalk");
const User = require("./api/database/models/Users");

const UserSample = [
  {
    email: "asandhu@hapiTest.com",
  },
];

const seed = async () => {
  await database.sync({ force: true });

  // seed your database here!
  await Promise.all(
    UserSample.map((user) => {
      return User.create(user);
    })
  );

  console.log(blue("Seeding success!"));
  database.close();
};

seed().catch((err) => {
  console.error(red("Something went wrong!"));
  console.error(err);
  database.close();
});
