const express = require("express");
const CreateGroupController = require("../controllers/CreateGroupController")
const router = express.Router();

router.post("/createGroup", CreateGroupController.createGroup);
module.exports = router;