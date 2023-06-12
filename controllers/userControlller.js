const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const createUser = asyncHandler(async (req, res) => {
//   try {
    const email = req.body.email;
    console.log(email);
    const findUser = await User.findOne({ email });
    if (!findUser) {
      const newUser = await User.create(req.body);
      res.status(201).send(newUser);
    } else {
      throw new Error("User already exist!");
    }
//   } catch (error) {
//     res.send({ message: error.message });
//   }
});
module.exports = {
  createUser,
};
