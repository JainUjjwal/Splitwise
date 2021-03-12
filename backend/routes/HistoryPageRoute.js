const express = require("express");
const router = express.Router();
 
const HistoryController = require("../controllers/HistoryController");


router.post('/history', HistoryController.transactionList )

module.exports = router;