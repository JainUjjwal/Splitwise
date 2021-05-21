const express = require("express");
const CreateGroupController = require("../controllers/CreateGroupController")
const router = express.Router();
const passport = require('passport')

router.post("/createGroup", passport.authenticate('jwt', { session: false }), CreateGroupController.createGroup);
module.exports = router;