var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { formData } = require("../../model/formData");
var checkSessionAuth = require("../../middlewares/checkSessionAuth");
var auth = require("../../middlewares/auth");

/*Get Projects*/
router.get("/", auth, async (req, res) => {
  let formdata = await formData.find();
  res.send(formdata);
});

/* Add New Project . */
router.post("/create-form", async (req, res) => {
  data = new formData(req.body);
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
    let formdata = await formData.findById(req.params.id);
    console.log(formdata);
    if (!formdata) return res.status(400).send("Id is not present");
    formdata = extend(formdata, req.body);
    await formdata.save();
    return res.send(formdata);
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
