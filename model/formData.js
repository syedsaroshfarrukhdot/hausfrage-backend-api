const mongoose = require("mongoose");


const formDataSchema = mongoose.Schema({

   
    StepTwo : String,
    StepThree : String,
    StepFour : String,
    StepFive : String,
    StepSix : String,
    StepSeven : String,
    StepEight : String,
    StepNine : String,
    StepTen : String,
    firstName : String,
    lastName : String,
    phone : String,
    postcode : String,
    email : String,
    Day : String,
    Month : String,
    Year : String,
    
   

})

const formData = mongoose.model("formData",formDataSchema)

module.exports.formData = formData;