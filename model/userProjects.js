const mongoose = require("mongoose");
const {User} = require("./user");
const {Project} = require("./project")




const userProjectSchema = mongoose.Schema({
    user: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    }],
    projects : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : Project
    }]
    
})

const userProjects = mongoose.model("userProjects",userProjectSchema)

module.exports.userProjects = userProjects;