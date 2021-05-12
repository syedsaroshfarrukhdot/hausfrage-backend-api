const mongoose = require("mongoose");

const zinkingSchema = mongoose.Schema(
  {
    Day: Number,
    Month: Number,
    Year: Number,
    StepTWo: String,
    StepFour: String,
    StepFive: String,
    StepSix: String,
    StepSeven: String,
    StepEight: String,
    PLZ: String,
    ORT: String,
    Straße: String,
    Nachname: String,
    Telefon: String,
    Email: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);

const zinKing = mongoose.model("zinKing", zinkingSchema);

module.exports.zinKing = zinKing;
