const express = require("express");
const router = express.Router();
const passport = require('passport')
const GroupPageController = require("../controllers/GroupPageController");
const TransactionController = require("../controllers/TransactionController")
const LeaveGroupController = require("../controllers/LeaveGroupController")

router.post('/groupPage', passport.authenticate('jwt', { session: false }), GroupPageController.getGroupInfo )
router.post('/addBill', passport.authenticate('jwt', { session: false }),TransactionController.addBill)
router.post('/leaveGroup', passport.authenticate('jwt', { session: false }),LeaveGroupController.leave)
router.post('/updateGroup',  passport.authenticate('jwt', { session: false }),GroupPageController.updateGroupInfo)
router.post('/newComment',  passport.authenticate('jwt', { session: false }),TransactionController.newComment)
module.exports = router;