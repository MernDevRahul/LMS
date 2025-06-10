const { default: mongoose } = require('mongoose');
const Emi = require('../model/Emi');
const Lead = require('../model/lead');
const Payment = require('./../model/payment');
const Student = require('../model/student');

exports.createPayment = async (req, res) => {
    // console.log(req.body);

    try {
        //------------------------------------------
        // let existingEmi=await Emi.findOne({
        //     $or:[
        //         {leadId:req.body.leadId},
        //         {studentId:req.body.studentId}
        //     ]
        // })

        // console.log(existingEmi);

        //-------------------------------------------
        let existingEmi = {}
        if (req.body.leadId != undefined) {
            existingEmi = await Emi.findOne({
                leadId: req.body.leadId
            })
        }

        if (req.body.studentId != undefined) {
            const student = await Student.findOne({ _id: req.body.studentId })
            existingEmi = await Emi.findOne({
                leadId: student.leadId
            })
        }


        if (existingEmi != null) {
            // console.log(existingEmi, "Student emi");
            const testPayment = await Payment.create({ ...req.body, EmiId: existingEmi._id });
            res.status(201).json({
                status: 'success',
            })
        } else {
            // console.log(existingEmi, "Lead emi");
            const emiToBeAdded = new Emi({ leadId: req.body.leadId });
            const emi = await emiToBeAdded.save();
            await Lead.findByIdAndUpdate(req.body.leadId, {
                EmiId: emi._id
            })
            const testPayment = await Payment.create({ ...req.body, EmiId: emi._id });
            res.status(200).json({
                status: 'success',
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.getAllPayment = async (req, res) => {
    try {
        const Payments = await Payment.find().sort({ createdAt: -1 });
        res.send(Payments)
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------
exports.getPayment = async (req, res) => {
    const { leadId } = req.query;
    // console.log(leadId);

    try {
        let id = new mongoose.Types.ObjectId(leadId);
        const payment = await Payment.findOne({ leadId: id });

        if (payment) {
            res.status(200).json({
                status: 'success',
                data: payment
            });
        } else {
            res.status(404).json({
                status: 'failure',
                message: 'Payment not found'
            });
        }
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error while fetching payment'
        });
    }
};
//--------------------------------------------------------------------------------
exports.getPaymentByEmiId = async (req, res) => {
    try {
        const id = req.params.id;
        const payment = await Payment.find({ EmiId: new mongoose.Types.ObjectId(id) }).sort({ createdAt: -1 });
        if (payment) {
            // res.status(200).send(
            //     {payment:payment}
            // )
            res.status(200).send(payment)

        } else {
            res.status(400).send("Payment not found")
        }
    } catch (error) {
        console.log(error);

    }

}
//--------------------------------------------------------------------------------
exports.updatePayment = async (req, res) => {
    try {
        const testPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testPayment // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}
//--------------------------------------------------------------------------------
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePayment = await Payment.findByIdAndDelete(id);
        if (!deletePayment) {
            // If no Payments is found, respond with an error
            return res.status(404).json({ message: "Payments not found" });
        }
        // If the Payments is deleted, send a success response
        res.status(200).json({ message: "Payments deleted successfully", deletePayment });
    } catch (error) {
        console.error("Error deleting Payments:", error);
        res.status(500).json({ message: "Failed to delete the Payments. Please try again." });
    }
}