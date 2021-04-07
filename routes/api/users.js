var express = require('express');
var router = express.Router();
const multer = require("multer")
var fs = require("fs");
var path = require("path");
const { User } = require("../../model/user");
const bcrypt = require('bcryptjs');
const _ = require('lodash')
const jwt = require("jsonwebtoken")
const config = require("config")
const auth = require("../../middlewares/auth")
const admin = require("../../middlewares/admin")



var Storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: Storage,
  fileFilter: (req, file, cb) => {
    var typeArray = file.mimetype.split("/");
    var fileType = typeArray[1];
    if (fileType == "jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Invalid upload: Only JPEG IMAGES ALLOWED"));
    }
  },
}).single("image");




/* GET Users */
router.get('/',async function(req, res, next) {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = perPage * (page - 1);
    let user = await User.find().skip(skipRecords).limit(perPage);
    return res.send(tasks);
  return res.send(user);
});

/* Signup . */
router.post("/register",upload, async (req, res) => {
    let user = await User.findOne({email:req.body.email});
    if (user) return res.status(400).send("User With Given Email Already Exsists");
    user = new User();
    user.firstName = req.body.firstName;
    user.middleName = req.body.middleName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.image = req.file.path;
    user.password = req.body.password;
    await user.generateHashedPassword();
    await user.save();
    return res.send(_.pick(user,['firstName','middleName','lastName','email']));
  });

// Sign In
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: user._id, firstName: user.firstName, middleName: user.middleName, lastName : user.lastName , role: user.role },
    config.get("jwtPrivateKey")
  );
  return res.send(token);
});

  // Update User
  router.put("/:id", auth ,admin, upload ,async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      if (!user) return res.status(400).send("User with given id is not present");
      user.firstName = req.body.firstName;
      user.middleName = req.body.middleName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.image = req.file.path;
      user.password = req.body.password;
      await user.generateHashedPassword();
      await user.save();
      let token = jwt.sign(
        { _id: user._id, firstName: user.firstName, middleName: user.middleName, lastName : user.lastName , role: user.role },
        config.get("jwtPrivateKey")
      );
      let dataToReturn = {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        token: user.token,
      };
      return res.send(dataToReturn);
    } catch (err){
      return res.status(400).send("Invalid Id"); // when id is inavlid
    }
  });

  // Delete user
  router.delete("/:id",auth,admin,async (req,res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(400).send("User with given id is not present"); // when there is no id in db
        }
        return res.send(user); // when everything is okay
      } catch {
        return res.status(400).send("Invalid Id"); // when id is inavlid
      }
  })

module.exports = router;