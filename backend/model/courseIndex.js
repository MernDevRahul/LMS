const { default: mongoose } = require("mongoose");

const CourseIndexSchema = new mongoose.Schema({
    "CourseId":{
        type:mongoose.Types.ObjectId
    },
    Topic: {
        type: String,
    },
    Duration: {
        type: Number,
    },
    isCompleted: {
        type: Boolean,
    },
    Trainer:{
        type:Array,
        default:[]  // Trainers._id...
    }
},{
    timestamps:true
});

const CourseIndex = mongoose.model("CourseIndex", CourseIndexSchema);
module.exports = CourseIndex;
