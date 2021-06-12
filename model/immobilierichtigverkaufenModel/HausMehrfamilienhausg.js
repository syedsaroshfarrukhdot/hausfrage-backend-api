const mongoose = require("mongoose");

const HausMehrfamilienhausgSchema = mongoose.Schema(
  {
    FirstName: String,
    SurName: String,
    Email: String,
    Gender: String,
    PhoneNumber: Number,
    PropertyType: String,
    PostalCode: Number,
    City: String,
    HouseNumber: String,
    Road: String,
    SellYourProperty: String,
    TypeOfHouse: String,
    apartmentBuildingRentedOut: String,
    areaOfTheProperty: String,
    askingPrice: String,
    houseBuiltSlider: String,
    houseCondition: String,
    numberOfResidentialUnits: String,
    totalLivingSpace: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const HausMehrfamilienhausg = mongoose.model(
  "HausMehrfamilienhausg",
  HausMehrfamilienhausgSchema
);

module.exports.HausMehrfamilienhausg = HausMehrfamilienhausg;
