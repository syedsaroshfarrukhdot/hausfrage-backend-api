const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name : String,
    startTime : Date,
    endTime : Date,
    description : String,
})

const Tasks = mongoose.model("Tasks",taskSchema)

module.exports.Tasks = Tasks;