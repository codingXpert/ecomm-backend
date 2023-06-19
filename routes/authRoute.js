const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userControlller");
const isAuthenticated = require("../config/passport").isAuthenticated;
const isAdmin = require('../config/passport').isAdmin;

router.post("/register", userController.createUser);
router.post("/login", passport.authenticate("local"), (req, res) => {       // (req,res) is optional
    res.send({ message: "LoggedIn Successfully" });
});
router.get("/logOut" , userController.logOut);
router.get("/findAll", isAuthenticated, userController.findAll);
router.put("/update", isAuthenticated, userController.updateUser);
router.delete("/delete/:_id", isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;
