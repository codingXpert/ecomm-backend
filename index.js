const express = require("express");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnection");
dbConnect();

const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
// const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Passport
require('./config/passport')
// initPassport.initializingPassport(passport);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session store
const connection = mongoose.createConnection(process.env.MONGO_URL);
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",          // collection name will be created as sessions
});

// Configure session middleware
app.use(cookieParser());
app.use(
  session({
    secret: 'asdfghjkl',
    resave: false,
    saveUninitialized: false,
    store: sessionStore, 
    cookie: {
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 Day  
    },
  })
);

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/' , require('./routes/index'));

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is running on port ${PORT}`);
});
