
const sendPasswordResetEmail = require('../../../../../utils/node-mailer/node-mailer');
const crypto = require('crypto');
const User = require('../../../../../models/user');
const errorMessages = require('../../../../../error-messages/error-messages');
require('dotenv').config();

const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};
   const  updatePasswordRequest = async (_, {data }) => {
      try {

        const {email} = data; 
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error(errorMessages.userNotFound);
        }
        const resetToken = generateRandomToken(); 
        const resetTokenExpires = new Date(Date.now() + 3600000); 
        user.resetToken = resetToken;
        user.resetTokenExpires = resetTokenExpires;
        await user.save();
        sendPasswordResetEmail(user.email, resetToken);
        return { message: "Password reset request initiated. Check your email for instructions." };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    
    module.exports = updatePasswordRequest;