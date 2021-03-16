const express = require("express");
const router = express.Router();

const myGroupsController = require("../controllers/MyGroupsController");
const inviteController = require('../controllers/inviteController')

router.post('/mygroups', myGroupsController.groupList )
router.get('/mygroups', myGroupsController.getInvites )

router.post('/accInvStatus', inviteController.accept)
router.post('/rejInvStatus', inviteController.reject)

module.exports = router;