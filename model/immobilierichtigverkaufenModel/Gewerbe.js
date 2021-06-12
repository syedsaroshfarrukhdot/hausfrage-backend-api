const mongoose = require("mongoose");

const GewerbeSchema = mongoose.Schema(
  {
    FirstName: String,
    SurName: String,
    Email: String,
    Gender: String,
    PhoneNumber: Number,
    PropertyType: String,
    PostalCode: Number,
    AreaOfCommercialProperty: String,
    SellYourProperty: String,
    UsableAreaOfBuilding: String,
    buildingType: String,
    commercialBuildingBuilt: String,
    parkingOptions: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const Gewerbe = mongoose.model("Gewerbe", GewerbeSchema);

module.exports.Gewerbe = Gewerbe;
