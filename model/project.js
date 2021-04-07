const mongoose = require("mongoose");
const { Tasks } = require("./task");
const { User } = require("./user");

const projectScheme = mongoose.Schema({

    name : String,
    startDate : Date,
    endDate : Date ,
    description : String,
    estHrs : Number,
    status : { type: Number,  max: 3 },
    remarks : String,
    workdone : String,
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tasks"
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
   

})

const Project = mongoose.model("Project",projectScheme)

module.exports.Project = Project;