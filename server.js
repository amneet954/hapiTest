"use strict";

const Hapi = require("@hapi/hapi");
const Glue = require("@hapi/glue");

const manifest = require("./api/index.js");
const options = {
  relativeTo: __dirname,
};

const startServer = async function () {
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

// const init = async () => {
//   const server = Hapi.server({
//     port: 3000,
//     host: "localhost",
//   });

//   await server.start();
//   console.log("Server running on", server.info.uri);
// };

// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   process.exit(1);
// });

// init();
