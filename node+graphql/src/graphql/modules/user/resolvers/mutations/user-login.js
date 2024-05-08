
const { generateToken, verifyToken } = require('../../../../../utils/utils.js');
const User = require('../../../../../models/user.js')
const errorMessages = require('../../../../../error-messages/error-messages.js');
require('dotenv').config(); 
  const  loginUser =async (_, { data }) => {
      try {
        const { email, password } = data;
        const user = await User.findOne({ where: { email } });

        if (!user) {
          throw new Error(errorMessages.userNotFound);
        }
        const isValidPassword = await user.validPassword(password);
        if (!isValidPassword) {
          throw new Error(errorMessages.invalidPassword);
        }
        const token = generateToken(user);
        user.token = token;
        await user.save();
        const decodedToken = verifyToken(token);
        console.log('Decoded Token:', decodedToken);
        return { id:user.id, userName: user.userName, email: user.email, token };
      } catch (error) {
        throw new Error(error.message);
      }
    }

    module.exports = loginUser;
