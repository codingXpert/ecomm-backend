const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userControlller");
const isAuthenticated = require("../config/passport").isAuthenticated;

router.post("/register", userController.createUser);
router.post("/login", passport.authenticate("local"), (req, res) => {     // (req,res) is optional
  res.send({ message: "LoggedIn" });
});
router.get("/findAll",isAuthenticated, userController.findAll);

module.exports = router;
