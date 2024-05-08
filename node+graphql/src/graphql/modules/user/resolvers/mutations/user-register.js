
const bcrypt = require('bcrypt');
const User = require("../../../../../models/user")
require('dotenv').config();


const registerUser = async (_, { data }) => {
  try {
    const { id, userName, email, password } = data;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({
      id,
      userName,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
 module.exports = registerUser;






