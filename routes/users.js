const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Lecture = require("../models/lecture");

const router = express.Router();
const Session = require("../models/session");

const initSession = async userId => {
  const token = await Session.generateToken();
  const session = new Session({ token, userId });
  await session.save();
  return session;
};

// import our authenticate middleware
const { authenticate } = require("../middleware/authenticate");

// note how we now pass in the authenticate function as an argument
// to the router.get() call
router.get("/user", authenticate, async (req, res) => {
  try {
    // using object destructuring to grab the userId from the request session
    const { userId } = req.session;

    // only retrieve the authenticated user's email
    const user = await User.findById(
      { _id: userId },
      { phoneNumber: 3, faculty: 2, name: 1, _id: 0 }
    );

    res.json({
      title: "Authentication successful",
      detail: "Successfully authenticated user",
      user
    });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: "Unauthorized",
          detail: "Not authorized to access this route",
          errorMessage: err.message
        }
      ]
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, faculty, phoneNumber, password, age, sex } = req.body;
    if (typeof password !== "string") {
      throw new Error("Password must be a string.");
    }
    const user = new User({ name, faculty, phoneNumber, password, age, sex });
    const persistedUser = await user.save();

    // we'll use the ID of the new user for our new session
    const userId = persistedUser._id;
    const session = await initSession(userId);

    res
      .cookie("token", session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 86400000, //one day
        secure: process.env.NODE_ENV === "production"
      })
      .status(201)
      .json({
        title: "User Registration Successful",
        detail: "Successfully registered new user",
        token: session.token,
        user
      });
  } catch (err) {
    res.status(400).json({
      errors: [
        {
          title: "Registration Error",
          detail: "Something went wrong during registration process.",
          errorMessage: err.message
        }
      ]
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (typeof password !== "string") {
      return res.status(400).json({
        errors: [
          {
            title: "Bad Request",
            detail: "Password must be a string"
          }
        ]
      });
    }
    //queries database to find a user with the received email
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error();
    }
    // use the ID of the user who logged in for the session
    const userId = user._id;
    const userDetails = await User.findById(
      { _id: userId },
      { sex: 5, age: 4, phoneNumber: 3, faculty: 2, name: 1, _id: 0 }
    );
    const courseDetails = await Lecture.findOne({ title: "Library Skills" });
    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      throw new Error();
    }
    // initialize our session
    const session = await initSession(userId);

    // same options as before!
    res
      .cookie("token", session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 86400000, //one day
        secure: process.env.NODE_ENV === "production" // will only be set to true in production
      })
      .json({
        title: "Login Successful",
        detail: "Successfully validated user credentials",
        token: session.token,
        userDetails,
        courseDetails
      });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: "Invalid Credentials",
          detail: "Check phone number and password combination",
          errorMessage: err.message
        }
      ]
    });
  }
});

module.exports = router;
