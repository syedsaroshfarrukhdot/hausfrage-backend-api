var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { formData } = require("../../model/formData");
var checkSessionAuth = require("../../middlewares/checkSessionAuth");


/*Get Projects*/
router.get("/",checkSessionAuth,async (req,res) => {
  let formdata = await formData.find();
  res.render("list", { title: "Products In DB", formdata });
  
})

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
 router.put("/:id",async (req, res) => {

  try {
    let project = await Project.findById(req.params.id);
    console.log(project)
    if (!project) return res.status(400).send("Project with given id is not present");
    project = extend(project,req.body)
    await project.save();
    return res.send(project);
  } catch {
    return res.status(400).send("Invalid Id"); // when id is inavlid
  }
});

 // Delete user
 router.delete("/:id",async (req,res) => {
  try {
      let project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(400).send("Project with given id is not present"); // when there is no id in db
      }
      return res.send(project); // when everything is okay
    } catch {
      return res.status(400).send("Invalid  Project Id"); // when id is inavlid
    }
})


module.exports = router;
