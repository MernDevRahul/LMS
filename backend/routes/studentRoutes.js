const { createStudent, getAllStudent, getStudentById, updateStudent, deleteStudent, LoginStudent, getStudentByBatchId, addBatchToStudent, } = require("../controllers/studentCtrl");
const express=require("express");
// const { authenticator } = require("../middleware/authenticator");
const studentRouter=express.Router();

studentRouter.post("/create",createStudent)
studentRouter.get("/getStudents",getAllStudent)
studentRouter.get("/getStudentById/:id",getStudentById)
studentRouter.get("/getStudentByBatchId/:id",getStudentByBatchId)
studentRouter.put("/updateStudent/:id",updateStudent)
studentRouter.delete("/deleteStudent/:id",deleteStudent)
studentRouter.post("/LoginStudent",LoginStudent)
studentRouter.post("/addBatchToStudent", addBatchToStudent);

module.exports=studentRouter;