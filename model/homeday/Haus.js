const mongoose = require("mongoose");

const HausHomeDaySchema = mongoose.Schema(
  {
    Anrede: String,
    ArtvonHaus: String,
    Ausrüstungsqualität: String,
    Außenmerkmale: Array,
    BaujahrderImmobilie: Number,
    EigenschaftenaktuelleNutzung: String,
    Grundstücksgröße: Number,
    Hausnr: String,
    IhreEmailAdresse: String,
    IhreTelefonnummer: String,
    Immobilienverkauf: String,
    Immobilienzeitverkaufen: String,
    Immobiliezuletztmodernisiert: String,
    Innenausstattung: Array,
    Ort: String,
    Straße: String,
    VorundNachname: String,
    Wohnraumgröße: String,
    plz: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const HausHomeDay = mongoose.model("HausHomeDay", HausHomeDaySchema);

module.exports.HausHomeDay = HausHomeDay;
