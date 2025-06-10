const { default: mongoose } = require("mongoose");
const Remark = require("../model/remarkSchema")

exports.createRemark = async(req,res)=>{
    try {
        const remark = await Remark.create(req.body);
        res.status(200).send("Remark Created")
    } catch (error) {
        console.log(error);
        
    }
}

exports.getRemark = async(req,res)=>{
    try {
        const{leadId} = req.params
        // console.log(leadId);
        
        const remark = await Remark.find({leadId:new mongoose.Types.ObjectId(leadId)})
        // console.log(remark);
        
        if(!remark){
            res.status(400).send("Remark Not Found")
        }else{
            res.status(200).send(remark);
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updateRemark = async(req,res)=>{
    
    try {
        const data = await Remark.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({data,msg:"Remark Updated"})
    } catch (error) {
        console.log(error);
    }
}