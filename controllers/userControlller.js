const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//user registration
const createUser = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      const newUser = await User.create(req.body);
      res.status(201).send(newUser);
    } else {
      throw new Error("User already exist!");
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      res.json(findUser);
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = {
  createUser,
  login,
};
