require("dotenv").config();
const { DataTypes } = require("sequelize");
const app = require("./app");
const debug = require("debug")("server");
const http = require("http");
const fs = require("fs");
const path = require("path");
const sequelize = require("./utils/database");

const appPath = path.resolve();

const port = normalizePort(process.env.SERVER_PORT || "5555");
app.set("port", port);

const server = http.createServer(app);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

(async function () {
  try {
    await sequelize.authenticate();
    debug("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  fs.readdirSync(appPath + "/schemas").forEach(function (file) {
    if (file.endsWith(".js")) {
      const filePath = `./schemas/${file}`;
      require(filePath);
    }
  });

  try {
    await sequelize.sync();
    debug("Tables created successfully");
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  } catch (error) {
    console.log("error while creating tables", error);
  }
})();
