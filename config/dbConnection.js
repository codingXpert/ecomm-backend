const mongoose = require("mongoose");
const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase Connected Successfully");
  } catch (error) {
    throw new error(error);
  }
};
module.exports = dbConnect;
