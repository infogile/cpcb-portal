var jwt = require("jsonwebtoken");
var User = require("components/user/user");
var isEmpty = require("helper").Validator.isEmpty;
class Login {
  constructor(express) {
    this.express = express;
  }
  // TODO : Make more clear for all auth request
  register() {
    // TODO : add middleware for request.
    this.express.post("/api/auth/login", (req, res) => {
      let errors = false;
      const { username, password } = req.body;
      if (isEmpty(username) || isEmpty(password)) {
        errors = true;
        return res
          .status(400)
          .json({ message: "Bad request", loading: false, type: "error" });
      }
      User.findOne({ username: username })
        .exec()
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              message: "no user registered",
              type: "error",
              loading: false,
            });
          }
          if (!user.comparePassword(password)) {
            return res.status(400).json({
              message: "Invalid Password",
              type: "error",
              loading: false,
            });
          }
          const payload = {
            id: user._id,
            username: user.username,
            role: user.role,
            state: user.state,
          };
          jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            res.json({
              success: true,
              token: "bearer " + token,
              user: user.username,
              role: user.role,
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ message: "Login failed", type: "error", loading: false });
        });
    });
  }
}

module.exports = Login;
