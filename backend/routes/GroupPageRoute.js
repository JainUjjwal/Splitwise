const express = require("express");
const router = express.Router();
 
const GroupPageController = require("../controllers/GroupPageController");


router.post('/groupPage', GroupPageController.transactionList )

module.exports = router;