const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema({
    Position : {
        type : String,
        unique:true,
        default: "",
    },
    "Abbreviation" :{
        type : String,
        required : true,
        unique:true,
        default: "",
    },
})

const Role = mongoose.model("Role",roleSchema)
module.exports=Role;