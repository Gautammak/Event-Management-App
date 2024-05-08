const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;

const generateToken = (user) => {
  try {
    const payload = {
      id:user.id,
      userName: user.userName,
      email: user.email
    };
    console.log("id",user.id);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] });

    return {
      id:decoded.id,
      email: decoded.email,
      userName: decoded.userName,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token");
  }
};


module.exports = { generateToken, verifyToken };
