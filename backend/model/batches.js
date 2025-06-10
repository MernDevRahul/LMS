const mongoose = require("mongoose");


const batchSchema = new mongoose.Schema({
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },  
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    batchType: {
        type: String,
        enum: ["Weekdays", "Weekends"],
        required: true
    },
    BatchLink: {
        type: String,
    }

}, {
    timestamps: true
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;