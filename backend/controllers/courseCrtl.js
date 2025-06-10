const Course = require('./../model/course');

exports.createCourse = async (req, res) => {
    try {
        const testCourse = await Course.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                testCourse
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}
//--------------------------------------------------------------------------------
exports.getAllCourse = async (req, res) => {
    try {
        const course = await Course.find();
        res.status(200).json({
            status: 'success',
            length: course.length,
            data: {
                course
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------
exports.getCourse = async (req, res) => {

}
//--------------------------------------------------------------------------------
exports.updateCourse = async (req, res) => {
    try {
        const testCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testCourse // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    } 
};
//--------------------------------------------------------------------------------
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      // If no course is found, respond with an error
      return res.status(404).json({ message: "Course not found" });
    }
    // If the course is deleted, send a success response
    res.status(200).json({ message: "Course deleted successfully", deletedCourse });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Failed to delete the course. Please try again." });
  }
};