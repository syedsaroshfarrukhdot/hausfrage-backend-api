var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { WohnungHomeDay } = require("../../../model/homeday/Wohnung");
var checkSessionAuth = require("../../../middlewares/checkSessionAuth");
var auth = require("../../../middlewares/auth");

/*Get Projects*/
router.get("/", auth, async (req, res) => {
  let wohnung = await WohnungHomeDay.find();
  res.send(wohnung);
});

/* Add New Project . */
router.post("/create-form", async (req, res) => {
  wohnung = new WohnungHomeDay(req.body);
  wohnung
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
    let wohnung = await WohnungHomeDay.findById(req.params.id);
    console.log(wohnung);
    if (!wohnung) return res.status(400).send("Id is not present");
    wohnung = extend(wohnung, req.body);
    await wohnung.save();
    return res.send(wohnung);
  } catch {
    return res.status(400).send("Invalid Id"); // when id is inavlid
  }
});

// // Delete user
// router.delete("/:id", async (req, res) => {
//   try {
//     let project = await Project.findByIdAndDelete(req.params.id);
//     if (!project) {
//       return res.status(400).send("Project with given id is not present"); // when there is no id in db
//     }
//     return res.send(project); // when everything is okay
//   } catch {
//     return res.status(400).send("Invalid  Project Id"); // when id is inavlid
//   }
// });

module.exports = router;
