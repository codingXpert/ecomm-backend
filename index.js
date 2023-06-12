const express = require("express");
const dbConnect = require("./config/dbConnection");
const { notFound , errorHandler } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/' , require('./routes/index'));
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is running on port ${PORT}`);
});
