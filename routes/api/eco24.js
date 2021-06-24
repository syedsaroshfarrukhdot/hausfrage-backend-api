var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { eco24 } = require("../../model/eco24");
var checkSessionAuth = require("../../middlewares/checkSessionAuth");
var auth = require("../../middlewares/auth");

/*Get Projects*/
router.get("/", auth, async (req, res) => {
  let eco = await eco24.find();
  res.send(eco);
});

/* Add New Project . */
router.post("/create-form", async (req, res) => {
  data = new eco24(req.body);
  data
    .save()
    .then((resp) => {
      return res.send(resp);
    })
    .catch((err) => {
      return res.status(500).send({ error: err });
    });
});

// Update Project
router.put("/create-form-edit/:id", auth, async (req, res) => {
  try {
    let eco = await eco24.findById(req.params.id);
    console.log(eco);
    if (!eco) return res.status(400).send("Id is not present");
    eco = extend(eco, req.body);
    await eco.save();
    return res.send(eco);
  } catch {
    return res.status(400).send("Invalid Id"); // when id is inavlid
  }
});

// // Delete user
// router.delete("/:id", async (req, res) => {
//   try {
//     let zinking = await zinKing.findByIdAndDelete(req.params.id);
//     if (!zinking) {
//       return res.status(400).send("Data with given id is not present"); // when there is no id in db
//     }
//     return res.send(zinking); // when everything is okay
//   } catch {
//     return res.status(400).send("Invalid Id"); // when id is inavlid
//   }
// });

module.exports = router;
