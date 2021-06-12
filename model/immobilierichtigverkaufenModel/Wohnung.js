const mongoose = require("mongoose");

const WohnungSchema = mongoose.Schema(
  {
    FirstName: String,
    SurName: String,
    Email: String,
    Gender: String,
    PhoneNumber: Number,
    elevatorBuilding: String,
    PropertyType: String,
    fittedKitchenInTheApartment: String,
    houseBuilt: String,
    livingSpaceOfApartment: String,
    parkingOptions: String,
    SellYourProperty: String,
    PostalCode: Number,
    ApartmentRooms: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const Wohnung = mongoose.model("Wohnung", WohnungSchema);

module.exports.Wohnung = Wohnung;
