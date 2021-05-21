const express = require("express");
const router = express.Router();
const passport = require('passport')
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController")
const logoutController = require("../controllers/logoutController");

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.post("/login", loginController.login_user_post);
router.get("/login", loginController.login_user_get);

router.post("/register", registerController.register);

router.post("/logout", logoutController.logout);
module.exports = router;
