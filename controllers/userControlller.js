const User = require("../models/userModel");

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
module.exports = {
  createUser,
};
