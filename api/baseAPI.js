const Joi = require("@hapi/joi");

exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
  });

  server.route({
    method: "POST",
    path: "/time",
    config: {
      validate: {
        payload: Joi.object({
          start: Joi.date().max("now").required(),
          end: Joi.date().min(Joi.ref("start")).max("now").required(),
        }),
        failAction: (request, h, error) => {
          return error;
        },
      },
    },
    handler: (request, h) => {
      return request.payload;
    },
  });
};
exports.pkg = {
  name: "api",
};
