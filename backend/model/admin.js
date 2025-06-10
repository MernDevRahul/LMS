const { default: mongoose } = require("mongoose");


const adminSchema=mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    Email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true 
    },
    loginAttempts:{
        type:Number,
        default:3
    },
    Role : {
        type:String,
        default : "ADMIN"
    },
    Status:{
        type:String,
        default:'Active',
        require:true 
    }
})


const Admin=mongoose.model("Admin",adminSchema)
module.exports=Admin
