"use strict";

const Glue = require("@hapi/glue");
const manifest = require("./api/index.js");

const options = {
  relativeTo: __dirname,
};

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log(`Server has started on PORT ${manifest.server.port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
