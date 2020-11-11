"use strict";

const User = require("../database/models/Users");

exports.register = (server, options) => {
  //Get All Users
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

  //Get User By Email
  server.route({
    method: "GET",
    path: "/users/{email}",
    handler: async (request, h) => {
      try {
        const { email } = request.params;
        const user = await User.findAll({
          where: {
            email,
          },
        });
        return user;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  });

  //Create User
  server.route({
    method: "POST",
    path: "/user",
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

  //Verify Password
  server.route({
    method: "POST",
    path: "/verify",
    handler: async (request, h) => {
      try {
        const { email, password } = request.payload;
        const response = await User.findAll({
          where: {
            email,
          },
        });

        let value = await response[0].checkPassword(password);
        return value;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  });

  //Delete User By Email
  server.route({
    method: "DELETE",
    path: "/users/{email}",
    handler: async (request, h) => {
      try {
        const { email } = request.params;
        const response = await User.destroy({
          where: {
            email,
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
