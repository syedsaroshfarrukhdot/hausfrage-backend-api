var express = require("express");
var router = express.Router();
var User = require("../../model/user");
var checkSessionAuth = require("../../middlewares/checkSessionAuth");


/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/users/login");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) return res.redirect("/users/login");
  req.session.user = user;
  return res.redirect("/");
});
router.post("/register", async function (req, res, next) {
  let user = new User(req.body);
  await user.save();
  res.redirect("/");
});

module.exports = router;
