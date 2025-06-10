const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount : {
        type:Number,
        required:true,
        default: 0,
    },
    payerName:{
        type: String,
        default:"",
    },
    MOP:{
        type: String,
        default:"",
    },
    platform:{
        type: String,
        default:"",
    },
    EmiId:{
        type: mongoose.Types.ObjectId,
        default:"",
    },
    isDispute:{
        type: Boolean,
        default:false,
    },
    disputeReason: {   // New field added
        type: String,
        default: "",
    },
    isVerified:{
        type: String,
        default: "Not Verified",
    },
},{
    timestamps:true
})


const Payment = mongoose.model("Payment",paymentSchema)
module.exports=Payment;