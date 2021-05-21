const express = require("express");
const router = express.Router();
const passport = require('passport')
const ProfileController = require("../controllers/ProfileController");


router.get('/profile', passport.authenticate('jwt', { session: false }),ProfileController.get_userInfo )
router.post('/profile', passport.authenticate('jwt', { session: false }),ProfileController.post_userInfo )
module.exports = router;