const mongoose = require("mongoose");

const HausSchema = mongoose.Schema(
  {
    FirstName: String,
    SurName: String,
    Email: String,
    Gender: String,
    PhoneNumber: Number,
    PropertyType: String,
    PostalCode: Number,
    Area: String,
    SellYourProperty: String,
    TypeOfHouse: String,
    houseFloors: String,
    houseBuiltYear: String,
    houseRooms: String,
    livingSpaceOfHouse: String,
    parkingOptions: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const Haus = mongoose.model("Haus", HausSchema);

module.exports.Haus = Haus;
