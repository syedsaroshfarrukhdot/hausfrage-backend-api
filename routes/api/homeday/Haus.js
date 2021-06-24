var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { HausHomeDay } = require("../../../model/homeday/Haus");
var checkSessionAuth = require("../../../middlewares/checkSessionAuth");
var auth = require("../../../middlewares/auth");

/*Get Projects*/
router.get("/", auth, async (req, res) => {
  let haus = await HausHomeDay.find();
  res.send(haus);
});

/* Add New Project . */
router.post("/create-form", async (req, res) => {
  haus = new HausHomeDay(req.body);
  haus
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
    let haus = await HausHomeDay.findById(req.params.id);
    console.log(haus);
    if (!haus) return res.status(400).send("Id is not present");
    haus = extend(haus, req.body);
    await haus.save();
    return res.send(haus);
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
