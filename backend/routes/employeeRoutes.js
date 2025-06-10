const { createEmployee, getAllEmployee, getEmployee, updateEmployee, deleteEmployee, LoginEmployee, loginEmployee } = require("../controllers/employeeCtrl");
const express=require("express");
// const { authenticator } = require("../middleware/authenticator");
const employeeRouter=express.Router();

employeeRouter.post("/create",createEmployee)
employeeRouter.get("/getEmployees",getAllEmployee)
employeeRouter.get("/getEmployee",getEmployee)
employeeRouter.put("/updateEmployee/:id",updateEmployee)
employeeRouter.delete("/deleteEmployee/:id",deleteEmployee)
employeeRouter.post("/login",loginEmployee)


module.exports=employeeRouter;