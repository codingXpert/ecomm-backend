const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//user registration
const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email);
    const findUser = await User.findOne({ email });
    if (!findUser) {
      const newUser = await User.create(req.body);
      res.status(201).send(newUser);
    } else {
      res.json({ message: "User already exist!", success: "false" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      res.json({
        _id: findUser?.id,
        firstName: findUser?.firstName,
        lastName: findUser?.lastName,
        email: findUser?.email,
        role: findUser?.role,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      });
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
