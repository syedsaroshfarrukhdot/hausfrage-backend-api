const mongoose = require("mongoose");

const formDataSchema = mongoose.Schema(
  {
    StepTwo: String,
    StepThree: String,
    StepFour: String,
    StepFive: String,
    StepSix: Number,
    StepSeven: Number,
    StepEight: Number,
    StepNine: String,
    StepTen: String,
    firstName: String,
    lastName: String,
    phone: String,
    postcode: String,
    place: String,
    address: String,
    email: String,
    Day: Number,
    Month: String,
    Year: Number,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);

const formData = mongoose.model("formData", formDataSchema);

module.exports.formData = formData;
