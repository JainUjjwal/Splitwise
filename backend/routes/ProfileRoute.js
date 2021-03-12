const express = require("express");
const router = express.Router();
 
const ProfileController = require("../controllers/ProfileController");


router.get('/profile', ProfileController.get_userInfo )
router.post('/profile', ProfileController.post_userInfo )
module.exports = router;