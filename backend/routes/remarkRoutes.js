const express = require("express");
const { getRemark, updateRemark, createRemark } = require("../controllers/remarkCrtl");

const remarkRoute = express.Router();

remarkRoute.post("/createRemark/",createRemark);
remarkRoute.get("/getRemark/:leadId",getRemark);
remarkRoute.put("/updateRemark/:id",updateRemark);

module.exports = remarkRoute