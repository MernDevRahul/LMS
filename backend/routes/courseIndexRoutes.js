const express = require("express")
const { createCourseIndex, getCourseIndex, deleteCourseIndex, updateCourseIndex } = require("../controllers/courseIndexCtrl")
const courseIndexRouter = express.Router()

courseIndexRouter.post('/createCourseIndex',createCourseIndex)
courseIndexRouter.get('/getCourseIndex',getCourseIndex)
courseIndexRouter.post('/updateCourseIndex/:id',updateCourseIndex)
courseIndexRouter.delete('/deleteCourseIndex',deleteCourseIndex)

module.exports = courseIndexRouter