var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { McMakler } = require("../../model/mcMakler");
var checkSessionAuth = require("../../middlewares/checkSessionAuth");
var auth = require("../../middlewares/auth");

/*Get Projects*/
router.get("/get-data", async (req, res) => {
  let mcmakler = await McMakler.find();
  res.send(mcmakler);
});

/* Add New Project . */
router.post("/create-form", async (req, res) => {
  data = new McMakler(req.body);
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
router.put("/create-form-edit/:id", async (req, res) => {
  try {
    let mcmakler = await McMakler.findById(req.params.id);
    console.log(mcmakler);
    if (!mcmakler) return res.status(400).send("Id is not present");
    mcmakler = extend(mcmakler, req.body);
    await mcmakler.save();
    return res.send(mcmakler);
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
