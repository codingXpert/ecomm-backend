var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const validPassword = require("../lib/passwordUtils").validPassword;

//check for Login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // these custom fields are important because it accepts name as username by default.
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        if (!email || !password) throw new Error("missing credentials");
        const user = await User.findOne({ email });
        if (!user) throw new Error("user not found");

        const passwordsMatch = await validPassword(password, user.password);
        if (!passwordsMatch) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // used to save the specific data to req.session or req,body of the user
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  // takes the data that we serialize into the session and use it to retrieve data from db
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

// to check user is loggedIn or not(is user add to req.body by the serializeUser)
exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();

  res.send({ message: "Invalid User" });
};

// checking logged in user is admin or not
exports.isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    res.send({ message: "You Are Not Allowed To Do This!" });
  } else {
    next();
  }
};
