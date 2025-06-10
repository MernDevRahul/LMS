const { createRole, getAllRole, getRole, updateRole, deleteRole } = require("../controllers/roleCtrl");
const express=require("express");
const { authenticator } = require("../middleware/authenticator");
const { createSession, getStudentsAttendingOnDate, getStudentAttendance, getSession } = require("../controllers/sessionCtrl");
// const { getStudentsAttendingOnDate, createSession } = require("../controllers/sessionCtrl");
const sessionRouter=express.Router();

sessionRouter.get("/students/:studentId", getStudentAttendance);
sessionRouter.post('/createSession',createSession)
sessionRouter.get('/getSession',getSession)
module.exports=sessionRouter;