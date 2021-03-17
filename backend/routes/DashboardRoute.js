const express = require("express");
const DashboardController = require("../controllers/DashboardController")
const SettleController = require('../controllers/SettleController')
const router = express.Router();

router.post("/dashboard", DashboardController.userInfopost);
router.get("/dashboard", DashboardController.getUserList);
router.post('/settle', SettleController.settle)
module.exports = router;