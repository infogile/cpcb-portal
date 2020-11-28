module.exports = [
  require("../providers/cors"),
  require("../providers/body-parser"),
  require("../providers/morgan"),
  require("../providers/passport"),
  require("../providers/helmet"),
  require("../providers/login"),
  // require('app/providers/handle-error'),
];
