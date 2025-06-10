const { createCourse, getAllCourse, getCourse, updateCourse, deleteCourse } = require("../controllers/courseCrtl");
const express=require("express");
// const { authenticator } = require("../middleware/authenticator");
const courseRouter=express.Router();

courseRouter.post("/create",createCourse)
courseRouter.get("/getCourses",getAllCourse)
courseRouter.get("/getCourse",getCourse)
courseRouter.put("/updateCourse/:id",updateCourse)
courseRouter.delete("/deleteCourse/:id",deleteCourse)

module.exports=courseRouter;