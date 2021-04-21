const express = require("express");
const router = express.Router();
const passport = require('passport')
const myGroupsController = require("../controllers/MyGroupsController");
const inviteController = require('../controllers/inviteController')

router.post('/mygroups',passport.authenticate('jwt', { session: false }), myGroupsController.groupList )
router.get('/mygroups',passport.authenticate('jwt', { session: false }), myGroupsController.getInvites )

router.post('/accInvStatus',passport.authenticate('jwt', { session: false }), inviteController.accept)
router.post('/rejInvStatus',passport.authenticate('jwt', { session: false }), inviteController.reject)

module.exports = router;