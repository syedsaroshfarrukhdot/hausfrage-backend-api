const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    task_name : String,

    task_description : String,
})

const Tasks = mongoose.model("Tasks",taskSchema)

module.exports.Tasks = Tasks;
