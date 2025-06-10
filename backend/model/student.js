const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
    "Lead by": {
        type: String,
        // required: true,
        default: "",
    },
    "Demo by": {
        type: String,
        // required: true,
        default: "",
    },
    //-------------------------- Personal Details -----------------------------
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
    FatherName:{
        type: String,
        default: "",
    },
    MotherName:{
        type: String,
        default: "",
    },
    "Email id": {
        type: String,
        required: true,
        unique: true,
        default: "",
    },
    "DOB": {
        type: String, 
        default: new Date(),
    },
    //-------------------------- Personal Details -----------------------------
    //--------------------------- Address Details -----------------------------
    Address : {

        Residence:{
            type: String,
            default: "",
        },
        Street:{
            type: String,
            default: "",
        },
        City:{
            type: String,
            default: "",
        },
        State:{
            type: String,
            default: "",
        },
        PostalCode:{
            type: String,
            default: "",
        },
        Country:{
            type: String,
            default: "",
        },

    },
    //--------------------------- Address Details -----------------------------
    //--------------------------- Course Details ------------------------------
    Course: {
        type: Array,
        required: true,
        default: [],
    },
    Fee: {
        type: Number,
        default: 0,
    },
    "DOJ": {
        type: String, 
        default: new Date(),
    },
    "DOA": {
        type: String, 
        default: new Date(),
    },
    Password: {
        type: String,
        default: "",
    },
    EmiId:{
        type: String,
        default: "",
    },
    Remark: {
        type: String,
        required: true,
        default: "",
    },
    //--------------------------- Course Details ------------------------------
    isFullyPaid: {
        type: Boolean,
        default: false,
    },
    isCourseCompleted: {
        type: Boolean,
        default: false,
    },
    "Student Status": {
        type: String,
        default: "running",
    },
    leadId: {
        type: String,
        default: "",
    },
    Role:{
        type:String,
        default:"STD"
    },
    studentId:{
        type:String,
        required: true,
        unique: true
    },
    
batchIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch", // Assuming your batch model is named "Batch"
        default: []
    }]

},{
    timestamps:true // date of Admission
});
const Student = mongoose.model("Student", studentSchema)
module.exports = Student;