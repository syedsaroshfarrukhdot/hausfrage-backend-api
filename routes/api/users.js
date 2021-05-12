var express = require("express");
var router = express.Router();
var { User } = require("../../model/user");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");

// /* GET users listing. */
// router.get("/register", function (req, res, next) {
//   res.render("register");
// });
// router.get("/login", function (req, res, next) {
//   res.render("login");
// });
// router.get("/logout", function (req, res, next) {
//   req.session.user = null;
//   res.redirect("/users/login");
// });
// router.post("/login", async function (req, res, next) {
//   let user = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   if (!user) return res.redirect("/users/login");
//   req.session.user = user;
//   return res.redirect("/");
// });
// router.post("/register", async function (req, res, next) {
//   let user = new User(req.body);
//   await user.save();
//   res.redirect("/");
// });

// module.exports = router;

/* GET Users */
router.get("/", auth, async function (req, res, next) {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let user = await User.find().skip(skipRecords).limit(perPage);
  return res.send(user);
});

/* Signup . */
router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User With Given Email Already Exsists");
  user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();
  return res.send(_.pick(user, "email"));
});

// Sign In
router.post("/login", async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    {
      email: user.email,
    },
    config.get("jwtPrivateKey")
  );
  return res.send(token);
});

// Update User
router.put("/:id", auth, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User with given id is not present");
    user.email = req.body.email;
    user.password = req.body.password;
    await user.generateHashedPassword();
    await user.save();
    let token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      config.get("jwtPrivateKey")
    );
    let dataToReturn = {
      _id: user._id,
      email: user.email,
    };
    return res.send(dataToReturn);
  } catch (err) {
    return res.status(400).send("Invalid Id"); // when id is inavlid
  }
});

// Delete user
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).send("User with given id is not present"); // when there is no id in db
    }
    return res.send(user); // when everything is okay
  } catch {
    return res.status(400).send("Invalid Id"); // when id is inavlid
  }
});

module.exports = router;
