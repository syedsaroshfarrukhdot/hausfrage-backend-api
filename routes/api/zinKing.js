var express = require("express");
const { extend } = require("lodash");
var router = express.Router();
const _ = require("lodash");
const { zinKing } = require("../../model/zinKing");
var checkSessionAuth = require("../../middlewares/checkSessionAuth");


/*Get Projects*/
router.get("/get-data",async (req,res) => {
  let zinking = await zinKing.find();
  res.render("zinking", { title: "Products In DB", zinking });
  
})

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
 router.post("/create-form-edit/:id",async (req, res) => {
  let zinking = await zinKing.findById(req.params.id);
  zinking.Note = req.body.Note;
  await zinking.save();
  res.redirect("/zinking/get-data");
});

 // Delete user
 router.delete("/:id",async (req,res) => {
  try {
      let zinking = await zinKing.findByIdAndDelete(req.params.id);
      if (!zinking) {
        return res.status(400).send("Data with given id is not present"); // when there is no id in db
      }
      return res.send(zinking); // when everything is okay
    } catch {
      return res.status(400).send("Invalid Id"); // when id is inavlid
    }
})


module.exports = router;
