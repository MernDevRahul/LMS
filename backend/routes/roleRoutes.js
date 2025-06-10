const { createRole, getAllRole, getRole, updateRole, deleteRole } = require("../controllers/roleCtrl");
const express=require("express");
// const { authenticator } = require("../middleware/authenticator");
const roleRouter=express.Router();

roleRouter.post("/create",createRole)
roleRouter.get("/getRoles",getAllRole)
roleRouter.get("/getRole",getRole)
roleRouter.put("/updateRole/:id",updateRole)
roleRouter.delete("/deleteRole/:id",deleteRole)

module.exports=roleRouter;