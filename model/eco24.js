const mongoose = require("mongoose");

const eco24Schema = mongoose.Schema(
  {
    StepOne: String,
    StepTwo: String,
    StepThree: String,
    Postleitahl: Number,
    StepFour: String,
    DateOfBirth: String,
    Vorname: String,
    Nachname: String,
    Email: String,
    Telefonnummer: String,
    Strabe: String,
    PLZ: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);

const eco24 = mongoose.model("eco24", eco24Schema);

module.exports.eco24 = eco24;
