const express = require("express");
const router = express.Router();
 
const GroupPageController = require("../controllers/GroupPageController");
const TransactionController = require("../controllers/TransactionController")
const LeaveGroupController = require("../controllers/LeaveGroupController")

router.post('/groupPage', GroupPageController.getGroupInfo )
router.post('/addBill',TransactionController.addBill)
router.post('/leaveGroup',LeaveGroupController.leave)
router.post('/updateGroup', GroupPageController.updateGroupInfo)
router.post('/newComment', TransactionController.newComment)
module.exports = router;