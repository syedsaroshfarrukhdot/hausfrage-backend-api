const mongoose = require("mongoose");

const GrundstuckHomeDaySchema = mongoose.Schema(
  {
    Immobilienverkauf: String,
    VorundNachname: String,
    plz: String,
    Anrede: String,
    Grundstücksgröße: String,
    IhreEmailAdresse: String,
    IhreTelefonnummer: String,
    Immobilienzeitverkaufen: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const GrundstuckHomeDay = mongoose.model(
  "GrundstuckHomeDay",
  GrundstuckHomeDaySchema
);

module.exports.GrundstuckHomeDay = GrundstuckHomeDay;
