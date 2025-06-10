const express=require("express");
const { login, getOtp, createAdmin } = require("../controllers/adminCrtl");
const adminRouter = express.Router();

adminRouter.post("/loginAdmin",login)
adminRouter.get("/otp",getOtp)
adminRouter.post("/createAdmin", createAdmin)

module.exports=adminRouter;