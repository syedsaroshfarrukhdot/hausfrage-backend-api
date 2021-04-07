const mongoose = require("mongoose");
const { Project} = require('./project')

const taskSchema = mongoose.Schema({
    name : String,
    startTime : Date,
    endTime : Date,
    description : String,
    projects : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project"
    }],
})

const Tasks = mongoose.model("Tasks",taskSchema)

module.exports.Tasks = Tasks;