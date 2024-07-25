const jwt = require("jsonwebtoken");
const User = require("../../Models/UserModel");

const {
  MISSING_FIELDS_ERROR,
  LOGIN_ERROR,
} = require("../../Constants/User/LoginMessages");

//? Method to check for missing fields
const checkForMissingFields = (req) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail || !userPassword) {
    throw new Error(MISSING_FIELDS_ERROR);
  }
};

//? Method to check email existence
const checkEmailExistence = async (userEmail, userPassword) => {
  const existingUser = await User.findOne({ userEmail });
  if (!existingUser || userEmail !== existingUser.userEmail) {
    throw new Error(LOGIN_ERROR);
  }
  if (existingUser.userPassword !== userPassword) {
    throw new Error(LOGIN_ERROR);
  }
  return existingUser;
};

//? Method to generate JWT token
const generateJwtToken = async (user) => {
  try {
    return await jwt.sign(
      { userId: user._id, userEmail: user.userEmail },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
  } catch (error) {
    throw new Error("Error generating JWT token");
  }
};

module.exports = {
  checkForMissingFields,
  checkEmailExistence,
  generateJwtToken,
};
