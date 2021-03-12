const express = require("express");
const DashboardController = require("../controllers/DashboardController")
const router = express.Router();

router.post("/dashboard", DashboardController.userInfopost);

module.exports = router;