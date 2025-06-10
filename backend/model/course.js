const { default: mongoose } = require("mongoose");

const courseSchema = new mongoose.Schema({
    "Course Name" :{
        type : String,
        required : true,
        // unique: true,
        default: "",
    },
    "Abbreviation" :{
        type : String,
        required : true,
        unique:true,
        default: "",
    },
    "Duration" :{
        type : String,
        required : true,
        default: "",
    },
    "DurationType" :{
        type : String,
        default: "",
    },
    "Course Fee":{
        type : Number,
        required : true,
        default: "0",
    },
    Trainers:{
        type:Array,
        default:[]  // Trainers._id...
    }
        
});

const Course = mongoose.model("Course",courseSchema)
module.exports=Course;
