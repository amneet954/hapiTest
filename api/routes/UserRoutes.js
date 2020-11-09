"use strict";

const User = require("../database/models/Users");

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

  server.route({
    method: "GET",
    path: "/users/{id}",
    handler: async (request, h) => {
      try {
        const { id } = request.params;
        const user = await User.findAll({
          where: {
            id,
          },
        });
        return user;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  });

  server.route({
    method: "POST",
    path: "/users",
    handler: async (request, h) => {
      try {
        const { email, password } = request.payload;
        const response = await User.create({ email, password });
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  });

  server.route({
    method: "DELETE",
    path: "/users/{id}",
    handler: async (request, h) => {
      try {
        const { id } = request.params;
        const response = await User.destroy({
          where: {
            id,
          },
        });
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  });
};

exports.pkg = {
  name: "UserRoutes.js",
};
