const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: { type: String, unique: true, lowercase: true, trim: true },
    role: { type: String, lowercase: true, trim: true, default: "user" },
    password: { type: String, required: true },
    state: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//password check
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("user", UserSchema);
