"use strict";

const manifest = {
  server: {
    port: 3000,
  },
  register: {
    plugins: [
      {
        plugin: require("./database/startDatabase"),
      },
      {
        plugin: require("./routes/UserRoutes"),
      },
    ],
    options: {
      once: true,
      //If you load a plugin twice, Hapi will stop you
    },
  },
};

module.exports = manifest;
