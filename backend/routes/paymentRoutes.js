
const { createPayment, getAllPayment, getPayment, updatePayment, deletePayment, getPaymentByEmiId } = require("../controllers/paymentCtrl");
const express=require("express");
// const { authenticator } = require("../middleware/authenticator");
const paymentRouter=express.Router();

paymentRouter.post("/create",createPayment)
paymentRouter.get("/getPayments",getAllPayment)
paymentRouter.get("/getPayment",getPayment)
paymentRouter.get("/getPaymentById/:id",getPaymentByEmiId)
paymentRouter.put("/updatePayment/:id",updatePayment)
paymentRouter.delete("/deletePayment/:id",deletePayment)

module.exports=paymentRouter;