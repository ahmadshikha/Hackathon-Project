//* Importing Packages
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

//? Creating Express router
const router = express.Router();

//* Importing the User model
const User = require("../../Models/UserModel");

//? Middlewares
app.use(express.json());
app.use(cors());

//? Importing Constants Register Messages
const {
  SUCCESSFUL_REGISTRATION_MESSAGE,
} = require("../../Constants/User/RegisterMessages");

//? Importing Register Verification Functions
const {
  validateFields,
  validateEmail,
  checkDuplicateEmail,
} = require("../../Controllers/UserControllers/RegesteController");

//? Register Route
router.post("/register", async (req, res) => {
  try {
    await validateFields(req);
    await validateEmail(req);
    await checkDuplicateEmail(req);

    //? Creating new User Instance
    const newUser = new User({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassword: req.body.userPassword,
    });

    //? Saving the new user to the database
    await newUser.save();

    //? Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '5d' } // Token expires in 5 days
    );

    //? Sending success response with token
    res.status(201).json({
      message: SUCCESSFUL_REGISTRATION_MESSAGE,
      userToken: token,
    });
  } catch (error) {
    let errorMessage = error.message;
    if (error.message === "User validation failed: userPassword: Password must be at least 6 characters long.") {
      errorMessage = "Password must be at least 6 characters long.";
    }
    res.status(400).json({ error: errorMessage });
  }
});

//? Exporting the router
module.exports = router;
