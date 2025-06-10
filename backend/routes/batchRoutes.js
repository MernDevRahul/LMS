const express=require("express");
const { createBatch, getAllBatch, getAllBatchForSearch, updateBatch, deleteBatch } = require("../controllers/batchCtrl");

const batchRouters = express.Router();

batchRouters.post("/create",createBatch)
batchRouters.get("/getAll",getAllBatch)
batchRouters.get('/getBatchforSearch',getAllBatchForSearch)
batchRouters.put("/updateBatch/:id",updateBatch)
batchRouters.delete("/deleteBatch/:id",deleteBatch)

module.exports=batchRouters;