const express = require("express");
const router = express.Router();

const myGroupsController = require("../controllers/MyGroupsController");

router.post('/mygroups', myGroupsController.groupList )

module.exports = router;