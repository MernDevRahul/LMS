const { createEmi, getAllEmi, getEmi, updateEmi, deleteEmi } = require("../controllers/emiCtrl");
const express=require("express");
// const { authenticator } = require("../middleware/authenticator");
const emiRouter=express.Router();

emiRouter.post("/create",createEmi)
emiRouter.get("/getEmis",getAllEmi)
emiRouter.get("/getEmi",getEmi)
emiRouter.put("/updateEmi/:id",updateEmi)
emiRouter.delete("/deleteEmi/:id",deleteEmi)

module.exports=emiRouter;