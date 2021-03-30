var express = require("express");
var router = express.Router();
const {Tasks} = require('../../model/task')

/* Get Tasks */
router.get("/show-task",async (req,res) => {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = perPage * (page - 1);
    let tasks = await Tasks.find().skip(skipRecords).limit(perPage);
    return res.send(tasks);
  })


/*Add new task*/ 
router.post("/create-task", async (req, res) => {
    let tasks = await Tasks.findOne({ task_name: req.body.task_name });
    if (tasks)
      return res.status(400).send("Task With Given Name Already Exsists");
     task = new Tasks(req.body);
    task
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
