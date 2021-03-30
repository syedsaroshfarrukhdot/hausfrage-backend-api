const mongoose = require("mongoose");
const { Tasks } = require("./task");

const projectScheme = mongoose.Schema({

    project_name : String,
    start_date : Date,
    end_date : Date ,
    description : String,
    est_hrs : Number,
    status : { type: Number,  max: 3 },
    remarks : String,
    workdone : String,
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : Tasks
    }]

})

const Project = mongoose.model("Project",projectScheme)

module.exports.Project = Project;