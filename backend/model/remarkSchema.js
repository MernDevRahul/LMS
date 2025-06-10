const { default: mongoose } = require("mongoose");

const remarkSchema = new mongoose.Schema({
    leadId:{
        type:mongoose.Types.ObjectId,
        default:""
    },
    message:{
        type:String
    },
},{
    timestamps:true
})

const Remark = mongoose.model("Remark",remarkSchema)
module.exports = Remark;