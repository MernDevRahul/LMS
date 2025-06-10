const Lead = require("../model/lead");


exports.createLead = async (req, res) => {
    try {
        const testLead = await Lead.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                testLead
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
exports.getAllLead = async (req, res) => {
    try {
        const Leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            length: Leads.length,
            data: {
                Leads
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------
exports.getLead = async (req, res) => {

}
//--------------------------------------------------------------------------------
exports.updateLead = async (req, res) => {
    try {
        const testLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testLead // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    } 
}
//--------------------------------------------------------------------------------
exports.deleteLead = async (req, res) => {
    try {
        const { id } = req.params; 
        const deleteLead = await Lead.findByIdAndDelete(id);
        if (!deleteLead) {
          // If no Leads is found, respond with an error
          return res.status(404).json({ message: "Leads not found" });
        }
        // If the Leads is deleted, send a success response
        res.status(200).json({ message: "Leads deleted successfully", deleteLead });
      } catch (error) {
        console.error("Error deleting Leads:", error);
        res.status(500).json({ message: "Failed to delete the Leads. Please try again." });
      }
}