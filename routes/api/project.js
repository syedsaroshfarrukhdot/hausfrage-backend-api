var express = require("express");
var router = express.Router();
const _ = require("lodash");
const { Project } = require("../../model/project");

/*Get Projects*/
router.get("/show-projects",async (req,res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let projects = await Project.find().skip(skipRecords).limit(perPage);
  return res.send(projects);
})

/* Add New Project . */
router.post("/create-project", async (req, res) => {
  let projects = await Project.findOne({ project_name: req.body.project_name });
  if (projects)
    return res.status(400).send("Project With Given Name Already Exsists");
  let project = new Project(req.body);
  project
    .save()
    .then((resp) => {
      return res.send(resp);
    })
    .catch((err) => {
      return res.status(500).send({ error: err });
    });
});

module.exports = router;
