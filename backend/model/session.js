const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    
    attendance:[ 
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
                required: true
            },
            status: {
                type: String,
                enum: ["Present", "Absent", "Late"],
                default: "Absent"
            }
        }]
    
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
