var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var sessionAuth = require("./middlewares/sessionAuth");
var logger = require("morgan");
var mongoose = require("mongoose");
var config = require("config");
var apiFormData = require("./routes/api/dataForm");
var apiUserRouter = require("./routes/api/users");
var apiZinKing = require("./routes/api/zinKing");
var apiMcMakler = require("./routes/api/mcmakler");
var apiGrundstuck = require("./routes/api/immobilierichtigverkaufen/Grundstuck");
var apiWohnung = require("./routes/api/immobilierichtigverkaufen/Wohnung");
var apiGewerbe = require("./routes/api/immobilierichtigverkaufen/Gewerbe");
var apiHaus = require("./routes/api/immobilierichtigverkaufen/Haus");
var apiHausMehrfamilienhausg = require("./routes/api/immobilierichtigverkaufen/HausMehrfamilienhausg");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", apiFormData);
app.use("/zinking", apiZinKing);
app.use("/mcmakler", apiMcMakler);
app.use("/users", apiUserRouter);
app.use("/grundstuck", apiGrundstuck);
app.use("/wohnung", apiWohnung);
app.use("/gewerbe", apiGewerbe);
app.use("/haus", apiHaus);
app.use("/haus-mehrfamilienhausg", apiHausMehrfamilienhausg);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection Not Established");
  });

module.exports = app;
