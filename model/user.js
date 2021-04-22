var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
