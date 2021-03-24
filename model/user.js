const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    first_name: String,
    middle_name:String,
    last_name:String,
    email: String,
    password: String,
    image : String,
    role: {
      type: String,
      default: "User",
    },
  });

  // for generating hased passwords
userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

  const User = mongoose.model("User", userSchema);
  module.exports.User = User;