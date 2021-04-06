var express = require("express");
var router = express.Router();
const {userProjects} = require('../../model/userProjects')
const { Tasks } = require("../../model/task");

/* Get Tasks */
router.get("/show-user-projects",async (req,res) => {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = perPage * (page - 1);
    let userproject = await userProjects.find().populate("user").
    populate("projects");
    return res.send(userproject);
  })


/*Assign User Project*/ 
router.post("/add-user-projects", async (req, res) => {
    let userproject = await userProjects.findOne({projects : req.body.projects})
    if (userproject)
      return res.status(400).send("User Project With Given Name Id Exsists");
      userproject = new userProjects(req.body);
      userproject
      .save()
      .then((resp) => {
        return res.send(resp);
      })
      .catch((err) => {
        return res.status(500).send({ error: err });
      });
  });


// Update Tasks
router.put("/:id",async (req, res) => {
    try {
      let task = await Tasks.findById(req.params.id);
      console.log(task)
      if (!task) return res.status(400).send("Task with given id is not present");
      task.name = req.body.name;
      task.startTime = req.body.startTime;
      task.endTime = req.body.endTime;
      task.description = req.body.description;
      await task.save();
      return res.send(task);
    } catch {
      return res.status(400).send("Invalid Id"); // when id is inavlid
    }
});
  
   // Delete user
   router.delete("/:id",async (req,res) => {
    try {
        let task = await Tasks.findByIdAndDelete(req.params.id);
        if (!task) {
          return res.status(400).send("Task with given id is not present"); // when there is no id in db
        }
        return res.send(task); // when everything is okay
      } catch {
        return res.status(400).send("Invalid Task Id"); // when id is inavlid
      }
  })
  

module.exports = router;
