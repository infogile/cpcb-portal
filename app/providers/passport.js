var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("components/user/user");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

class Passport {
  constructor(express) {
    this.express = express;
  }
  register() {
    this.express.use(passport.initialize());
    passport.use(
      new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.id)
          .select("-__v -password -createdAt -updateAt")
          .exec()
          .then((user) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
    );
  }
}
module.exports = Passport;
