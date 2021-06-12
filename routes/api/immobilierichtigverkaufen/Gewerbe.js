var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const {
  Gewerbe,
} = require("../../../model/immobilierichtigverkaufenModel/Gewerbe");
var checkSessionAuth = require("../../../middlewares/checkSessionAuth");
var auth = require("../../../middlewares/auth");

/*Get Projects*/
router.get("/", auth, async (req, res) => {
  let gewerbe = await Gewerbe.find();
  res.send(gewerbe);
});

/* Add New Project . */
router.post("/create-form", async (req, res) => {
  gewerbe = new Gewerbe(req.body);
  gewerbe
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
    let gewerbe = await Gewerbe.findById(req.params.id);
    console.log(gewerbe);
    if (!gewerbe) return res.status(400).send("Id is not present");
    gewerbe = extend(gewerbe, req.body);
    await gewerbe.save();
    return res.send(gewerbe);
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
