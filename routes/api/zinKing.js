var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { zinKing } = require("../../model/zinKing");
var checkSessionAuth = require("../../middlewares/checkSessionAuth");
var auth = require("../../middlewares/auth");

/*Get Projects*/
router.get("/get-data", auth, async (req, res) => {
  let zinking = await zinKing.find();
  res.send(zinking);
});

/* Add New Project . */
router.post("/create-form", async (req, res) => {
  data = new zinKing(req.body);
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
    let zinking = await zinKing.findById(req.params.id);
    console.log(zinking);
    if (!zinking) return res.status(400).send("Id is not present");
    zinking = extend(zinking, req.body);
    await zinking.save();
    return res.send(zinking);
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
