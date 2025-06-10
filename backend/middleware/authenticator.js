const jwt=require("jsonwebtoken");
const Employee = require("../model/employee");
const Student = require("../model/student");
const Admin = require("../model/admin");
// const User = require("../models/user");
exports.authenticator=async(req,res,next)=>{
        // console.log(req.headers.authorization);
        
    try {
        let user={}
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        
        const verify=jwt.verify(token,process.env.SECRET)
        // console.log(verify);
        
        if(verify.Role==="ADMIN" ){
         user = await Admin.findOne({Email:verify.Email});
         
        }else if(verify.Role!=="ADMIN" && verify.Role!=="STD"){
            user = await Employee.findOne({Email:verify.Email});
            //  console.log("User is",user);
         
        }
        else{
         user = await Student.findOne({Email:verify.Email});
        }
        // console.log(user);
        
        req.userId=user._id;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid Token or Token Expire")
    }
} 