const Emi = require('./../model/Emi');

exports.createEmi = async (req, res) => {
    try {
        const testEMI = await Emi.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                testEMI
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
exports.getAllEmi = async (req, res) => {
    try {
        const EMIs = await Emi.find();
        res.status(201).json({
            status: 'success',
            length: EMIs.length,
            data: {
                EMIs
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------
exports.getEmi = async (req, res) => {
    const {leadId} = req.query
   const payment= await Emi.findOne({leadId:leadId})
    if(payment!=null){
        res.send({exists:true})
    }else{
        res.send({exists:false})
    }
}
//--------------------------------------------------------------------------------
exports.updateEmi = async (req, res) => {
    try {
        const testEMI = await Emi.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testEMI // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}
//--------------------------------------------------------------------------------
exports.deleteEmi = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedEmi = await Emi.findByIdAndDelete(id);
        if (!deletedEmi) {
          // If no course is found, respond with an error
          return res.status(404).json({ message: "Course not found" });
        }
        // If the course is deleted, send a success response
        res.status(200).json({ message: "Course deleted successfully", deletedEmi });
      } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Failed to delete the course. Please try again." });
      }
}