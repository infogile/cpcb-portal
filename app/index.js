require("newrelic");
const http = require("http");
const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const ConfigManager = require("app/config-manager");
const ComponentManager = require("app/component-manager");
// const { config } = require('dotenv')
class Application {
  constructor() {
    let config = new ConfigManager();
    this.express = express();
    this.serverConfig = config.get("server");
    // this.dbConfig = config.get('database');
    this.serviceProviders = config.get("service-provider");
  }

  setUpServer() {
    this.createServer(this.serverConfig.protocol === "https");
  }

  async setUpDatabase() {
    // let db = this.dbConfig;
    // this.express.db = await db.connect().catch(console.warn);
    await mongoose
      .connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("connected to mongoDB");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  registerServiceProviders() {
    this.serviceProviders.forEach((ServiceProvider) => {
      try {
        let instance = new ServiceProvider(
          this.express,
          this.server,
          this.serverConfig
        );

        if (typeof instance.register === "function") {
          instance.register();
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  installServiceProviders() {
    this.serviceProviders.forEach((ServiceProvider) => {
      try {
        let instance = new ServiceProvider(
          this.express,
          this.server,
          this.serverConfig
        );

        if (typeof instance.install === "function") {
          instance.install();
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  createServer(secure) {
    if (secure === true) {
      this.server = https.createServer(
        this.serverConfig.certificates,
        this.express
      );
    } else {
      this.server = http.createServer(this.express);
    }

    // register service provider
    this.registerServiceProviders();
    const handleError = (err, res) => {
      const { statusCode, message } = err;
      res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
      });
    };
    this.express.get("/process", (req, res) => {
      res.send(`<h3>It's ${process.pid}</h3>`);
    });
    // register components
    new ComponentManager(this.express).registerComponents();
    this.express.use((err, req, res, next) => {
      console.log("Error");
      handleError(err, res);
    });
    // install service provider
    this.installServiceProviders();
    this.server.setTimeout(10 * 60 * 1000);
    return this.server;
  }

  getWeb() {
    this.getExpress().use(express.static("build"));
  }

  getExpress() {
    return this.express;
  }

  getServer() {
    return this.server;
  }

  getRouter() {
    return express.Router();
  }

  getDatabase() {
    return this.express.db;
  }

  run() {
    this.setUpDatabase();
    this.setUpServer();
    this.getWeb();
    this.server.listen(this.serverConfig.port);

    console.log("server listening on port :" + this.serverConfig.port);
  }
}

module.exports = new Application();
