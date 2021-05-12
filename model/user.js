var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
  email: String,
  password: String,
});

// for generating hased passwords
UserSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};
const User = mongoose.model("User", UserSchema);
module.exports.User = User;
