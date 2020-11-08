const User = require("./database/models/Users");
exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
exports.pkg = {
  name: "UserRoutes.js",
};
