const CourseIndex = require("../model/courseIndex")

exports.createCourseIndex  = async (req,res)=>{
    try {
        const courseIndex = new CourseIndex(req.body)
        const courseIndexSaved = await courseIndex.save()
        res.status(201).json({
            status: 'success',
            data: {
                courseIndexSaved
            }
        }) 
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


// ----------------------------------------------------------------------------------------
exports.getCourseIndex = async (req,res)=>{
    try {
        const courseIndex = await CourseIndex.find();
        res.status(201).json({
            status: 'success',
            length: Leads.length,
            data: {
                courseIndex
            }
        })
    } catch (error) {
        console.log(error)
    }
}



// -----------------------------------------------------------------------------------------------
exports.updateCourseIndex = async (req,res)=>{
    try {
        const updateCourse = await CourseIndex.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(201).json({
            status:"success",
            data:updateCourse
        })
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message:error.message
        })
    }
}

// --------------------------------------------------------------------------------------------------

exports.deleteCourseIndex = async ()=>{
    try {
        const deleteCourse = await CourseIndex.findByIdAndDelete(req.body)
        if(!deleteCourse){
            res.status(404).json({message:"Not found!"})
        }
        res.status(201).json({
            status:'fail',
            message:"Deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting Leads:", error);
        res.status(500).json({ message: "Failed to delete. Please try again." });
    }
}