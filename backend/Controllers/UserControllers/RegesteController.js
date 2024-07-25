const validator = require("validator");


const User = require("../../Models/UserModel");

//* Importing Constants Messages
const {
  REQUIRED_FIELD_ERROR,
  INVALID_EMAIL,
  DUPLICATE_EMAIL,
} = require("../../Constants/User/RegisterMessages");
//* Importing Constants Messages *\\

//? Create Functions To Validation 
async function validateFields(req) {
  const { userName, userEmail, userPassword } = req.body;
  if (!userName || !userEmail || !userPassword) {
    throw new Error(REQUIRED_FIELD_ERROR);
  }
}

async function validateEmail(req) {
  const { userEmail } = req.body;
  if (!validator.isEmail(userEmail)) {
    throw new Error(INVALID_EMAIL);
  }
}

async function checkDuplicateEmail(req) {
  const { userEmail } = req.body;
  const existingUser = await User.findOne({ userEmail });
  if (existingUser) {
    throw new Error(DUPLICATE_EMAIL);
  }
}
//? Create Functions To Validation ؟\\

module.exports = {
  validateFields,
  validateEmail,
  checkDuplicateEmail,
};
