const express = require("express");
const passport = require('passport')

const DashboardController = require("../controllers/DashboardController")
const SettleController = require('../controllers/SettleController')
const router = express.Router();

router.post("/dashboard",  passport.authenticate('jwt', { session: false }),DashboardController.userInfopost);
router.get("/dashboard", passport.authenticate('jwt', { session: false }), DashboardController.getUserList);
router.post('/settle', passport.authenticate('jwt', { session: false }), SettleController.settle)
module.exports = router;