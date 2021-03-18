const fs = require('fs');

module.exports = {
  env: process.env.NODE_ENV || "development",
  protocol: process.env.NODE_ENV === "production" ? "https" : "http", // http or https
  host: "0.0.0.0",
  port: process.env.PORT || 9090,

  // TODO update this for https
  certificates: {
    key: fs.readFileSync("/etc/letsencrypt/live/www.gangagpis.in/privkey.pem", "utf8"),
    cert: fs.readFileSync("/etc/letsencrypt/live/www.gangagpis.in/cert.pem", "utf8"),
    ca: fs.readFileSync("/etc/letsencrypt/live/www.gangagpis.in/chain.pem", "utf8"),
  },
};
