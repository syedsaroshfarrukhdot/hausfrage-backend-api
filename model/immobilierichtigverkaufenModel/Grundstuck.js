const mongoose = require("mongoose");

const GrundstuckSchema = mongoose.Schema(
  {
    FirstName: String,
    SurName: String,
    Email: String,
    Gender: String,
    IsPropertyDeveloped: String,
    PhoneNumber: Number,
    Area: String,
    PropertyType: String,
    BuldingOptions: String,
    SellYourProperty: String,
    PostalCode: Number,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const Grundstuck = mongoose.model("Grundstuck", GrundstuckSchema);

module.exports.Grundstuck = Grundstuck;
