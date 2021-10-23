const http = require("http");
const express = require("express");
const morgan = require("morgan");
const config = require("../config");
const api = require("../app");
const logger = require("../config/winston");
const db = require("../config/db");
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("../utils/helpers/dbErrorHandler");
const seedRunner = require("../seedRunner");

let httpServer;
const app = express();
function initialize() {
  return new Promise((resolve, reject) => {
    httpServer = http.createServer(app);

    app.use(express.json());
    app.use(morgan("combined", { stream: logger.stream }));
    app.use(cors("*"));
    app.use("/public", express.static("public"));

    api(app, db);
    app.use((error, req, res, next) => {
      console.log(`SERVER ERROR: ${error.stack}`);
      res.status(400).json({
        error: errorHandler(error),
      });
    });

    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    db.sequelize.sync({ force: config.db.force, logging: console.log })
      .then(() => {
        console.log("Connection has been established successfully");

        httpServer
          .listen(config.port)
          .on("listening", () => {
            if (config.db.force && config.runSeed) {
              seedRunner(db);
            }
            resolve();
            console.log(`Started application on http://localhost:${config.port}`);
          })
          .on("error", (err) => {
            console.error("Error while starting the server.");
            reject(err);
          });
        return;
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports.initialize = initialize;
module.exports.close = close;
