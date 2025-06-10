const { default: mongoose } = require("mongoose");

const LeadSchema = new mongoose.Schema({
    "Name": {
        type: String,
        required: true,
        default: "",
    },
    Phone: {
        type: String,
        required: true,
        default: "",
    },
    "Email id": {
        type: String,
        // required: true,
        // unique: true,
        default: "",
    },
    "EmiId":{
        type:mongoose.Types.ObjectId
    },
    Course: {
        type: Array,
        required: true,
        default: [],
    },
    Fee: {
        type: Number,
        default: 0,
    },
    Remark: {
        type: String,
        default: "",
    },
    "Follow-Up Date":{
        type: String,
        default: "",
    },
    "DOJ": {
        type: String, 
        default: "",
    },
    isVisited: {
        type: Boolean,
        default: false,
    },
    isDemonstrated: {
        type: Boolean,
        default: false,
    }, 
    "Demo by": {
        type: String,
        default: "",
    },  
    "Admission Status": {
        type: String,
        default: "Not done",
    },
    "Lead by": {
        type: String,
        // required: true,
        default: "",
    },
    isVerified:{
        type: String,
        default: "Not Verified",
    }
},{
    timestamps:true
});
const Lead = mongoose.model("Lead", LeadSchema);
module.exports = Lead;
