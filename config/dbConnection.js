const mongoose = require("mongoose");
const dbConnect = () => {
  try {
    const connection = mongoose.connect("mongodb://localhost:27017/ecomm_backend");
    console.log("DataBase Connected Successfully");
  } catch (error) {
    throw new error(error);
  }
};
module.exports = dbConnect;
