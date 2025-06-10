const Batch = require("../model/batches.js");

exports.createBatch = async (req, res) => {
    try {
        const { trainerId, courseId, timings, batchType } = req.body;
        
        // Use find() to get all batches with the same trainerId, courseId, and timings
        const existingBatches = await Batch.find({ trainerId, courseId, timings });

        // Loop through the existing batches to check if there's already a batch with the same batchType
        for (const batch of existingBatches) {
            console.log(batch);
            
            if (batch.batchType == batchType) {
                // If a matching batch is found, return an error
                return res.status(400).json({
                    status: 'fail',
                    message: 'A batch with the same trainerId, courseId, timings, and batchType already exists.'
                });
            }
        }

        // If no duplicate batchType exists, create the new batch
        const create_Batch = await Batch.create(req.body);

        // Return the successful response with the newly created batch
        res.status(201).json({
            status: 'success',
            batch: create_Batch // Return the created batch
        });
    } catch (error) {
        // Log the error and return a 500 error response
        console.error('Error in createBatch:', error); // More detailed logging for debugging
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while creating the batch. Please try again later.'
        });
    }
};

//=================================================================
exports.getAllBatch = async (req, res) => {
    try {
        // Default values for limit and page if not provided in the query string
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        // Validate that limit and page are positive integers
        if (limit <= 0 || page <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Limit and page must be positive integers.'
            });
        }

        // Calculate the skip value based on the current page and limit
        const skip = (page - 1) * limit;

        // Fetch the Batch records with limit and skip for pagination
        const get_Batch = await Batch.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get the total count of records for pagination
        const totalRecords = await Batch.countDocuments();

        res.status(200).json({
            status: 'success',
            length: get_Batch.length,
            totalRecords,
            page,
            totalPages: Math.ceil(totalRecords / limit), // Calculate total pages
            get_Batch  // Comment in production
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

//=================================================================
exports.getAllBatchForSearch = async (req, res) => {
    try {
        const batches = await Batch.find();
        res.status(200).json({
            status: 'success',
            length: batches.length,
            data: {
                batches
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//=================================================================
exports.updateBatch = async (req, res) => {
    try {
        const testBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testBatch // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    } 
};

//=================================================================
exports.deleteBatch = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedBatch = await Batch.findByIdAndDelete(id);
      if (!deletedBatch) {
        // If no Batch is found, respond with an error
        return res.status(404).json({ message: "Batch not found" });
      }
      // If the Batch is deleted, send a success response
      res.status(200).json({ message: "Batch deleted successfully", deletedBatch });
    } catch (error) {
      console.error("Error deleting Batch:", error);
      res.status(500).json({ message: "Failed to delete the Batch. Please try again." });
    }
  };