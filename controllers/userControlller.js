const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const genPassword = require("../lib/passwordUtils").genPassword;
const validPassword = require("../lib/passwordUtils").validPassword;

//user registration
const createUser = async (req, res) => {
  try {
    const hashedPassword = await genPassword(req.body.password);
    const email = req.body.email;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      const data = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        mobile: req.body.mobile,
        password: hashedPassword,
      });
      const newUser = await User.create(data);
      res.status(201).send(newUser);
    } else {
      res.json({ message: "User already exist!", success: "false" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

//logOut
const logOut = async (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        res.send({ message: err.message });
      }
      res.send({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};

//fetch all users
const findAll = async (req, res) => {
  const listAll = await User.find({}, "-password"); // ignoring password in return
  res.json(listAll);
};

//update the user
const updateUser = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const user = await User.findByIdAndUpdate(req.user.id, data);
    await res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = {
  createUser,
  logOut,
  findAll,
  updateUser,
};
