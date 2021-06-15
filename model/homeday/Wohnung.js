const mongoose = require("mongoose");

const WohnungHomeDaySchema = mongoose.Schema(
  {
    Anrede: String,
    Apartmentzimmer: Number,
    Ausrüstungsqualität: String,
    Außenmerkmale: Array,
    BaujahrderImmobilie: Number,
    EigenschaftenaktuelleNutzung: String,
    Gebäudeböden: Number,
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
    Wohnungsart: String,
    plz: String,
    Note: String,
    Option: String,
  },
  { timestamps: true }
);
const WohnungHomeDay = mongoose.model("WohnungHomeDay", WohnungHomeDaySchema);

module.exports.WohnungHomeDay = WohnungHomeDay;
