const fs = require('fs');

module.exports = {
  env: process.env.NODE_ENV || "development",
  protocol: process.env.NODE_ENV === "production" ? "http" : "http", // http or https
  host: "0.0.0.0",
  port: process.env.PORT || 9090,

  // TODO update this for https
  // certificates: {
  //   key: fs.readFileSync("/home/dropletadmin/.ssl/privkey.pem", "utf8"),
  //   cert: fs.readFileSync("/home/dropletadmin/.ssl/cert.pem", "utf8"),
  //   ca: fs.readFileSync("/home/dropletadmin/.ssl/chain.pem", "utf8"),
  // },
};