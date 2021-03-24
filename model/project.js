const mongoose = require("mongoose");

const projectScheme = mongoose.Schema({

    project_name : String,
    start_date : Date,
    end_date : Date ,
    description : String,
    est_hrs : Number,
    status : { type: Number,  max: 3 },
    remarks : String,
    workdone : String

})

const Project = mongoose.model("Project",projectScheme)

module.exports.Project = Project;