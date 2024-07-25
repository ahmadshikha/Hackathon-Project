// Import necessary modules and setup Express app and router
const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();


//? Import User model, Constants, and Controller functions
const User = require("../../Models/UserModel");

const { LOGIN_SUCCESS } = require("../../Constants/User/LoginMessages");
const {
  checkForMissingFields,
  checkEmailExistence,
  generateJwtToken,
} = require("../../Controllers/UserControllers/LoginController");

// Middleware setup
app.use(express.json());
app.use(cors());

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Validate and process login credentials
    checkForMissingFields(req);

    const { userEmail, userPassword } = req.body;
    const existingUser = await checkEmailExistence(userEmail, userPassword);

    // Generate JWT token
    const userToken = await generateJwtToken(existingUser);

    res.cookie('userToken', userToken, {
      httpOnly: true,
    });

    // Respond with success message and token
    res.status(200).json({
      message: LOGIN_SUCCESS,
      userToken: userToken,
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({
      error: error.message
    });
  }
});

// Export router
module.exports = router;
