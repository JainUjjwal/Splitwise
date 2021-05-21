const express = require("express");
const router = express.Router();
const passport = require('passport')
const HistoryController = require("../controllers/HistoryController");


router.post('/history', passport.authenticate('jwt', { session: false }),HistoryController.transactionList )

module.exports = router;