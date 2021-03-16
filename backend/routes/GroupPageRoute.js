const express = require("express");
const router = express.Router();
 
const GroupPageController = require("../controllers/GroupPageController");
const TransactionController = require("../controllers/TransactionController")

router.post('/groupPage', GroupPageController.getGroupInfo )
// router.get('/groupPage', GroupPageController.getGroupInfo)
router.post('/addBill',TransactionController.addBill)

module.exports = router;