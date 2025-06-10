const { default: mongoose } = require("mongoose");

const emiSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Types.ObjectId,
    },
    leadId:{
        type: mongoose.Types.ObjectId,
    }
})

const Emi = mongoose.model("EMI",emiSchema)
module.exports=Emi;