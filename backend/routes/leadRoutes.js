
const { createLead, getAllLead, getLead, updateLead, deleteLead } = require("../controllers/leadCtrl");
const express=require("express");
// const { authenticator } = require("../middleware/authenticator");
const leadRouter=express.Router();

leadRouter.post("/create",createLead)
leadRouter.get("/getLeads",getAllLead)
leadRouter.get("/getLead",getLead)
leadRouter.put("/updateLead/:id",updateLead)
leadRouter.delete("/deleteLead/:id",deleteLead)

module.exports=leadRouter;