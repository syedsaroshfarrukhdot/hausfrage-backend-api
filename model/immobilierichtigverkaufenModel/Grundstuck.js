const mongoose = require("mongoose");

const GrundstuckSchema = mongoose.Schema(
  {
    FirstName: String,
    SurName: String,
    Email: String,
    Gender: String,
    PhoneNumber: Number,
    PostalCode: Number,
    PropertyType: String,
    IsPropertyDeveloped: String,
    Area: String,
    BuldingOptions: String,
    SellYourProperty: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const Grundstuck = mongoose.model("Grundstuck", GrundstuckSchema);

module.exports.Grundstuck = Grundstuck;
