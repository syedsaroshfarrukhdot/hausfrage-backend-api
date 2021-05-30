const mongoose = require("mongoose");

const mcmaklerSchema = mongoose.Schema(
  {
    StepOne: String,
    StepTwo: String,
    StepThree: String,
    StepFour: String,
    StepFive: String,
    StepSix: String,
    StepSeven: String,
    StepEight: String,
    StepNine: String,
    StepTen: String,
    Vorname: String,
    Nachname: String,
    Email: String,
    Phone: Number,
  },
  { timestamps: true }
);

const McMakler = mongoose.model("McMakler", mcmaklerSchema);

module.exports.McMakler = McMakler;
