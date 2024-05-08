
const bcrypt = require('bcrypt');
const User = require('../../../../../models/user');
const errorMessages = require('../../../../../error-messages/error-messages');
require('dotenv').config();



const    resetPassword =  async (_, { data}) => {
      try {

        const {resetToken, newPassword} = data;
        const user = await User.findOne({ where: { resetToken } });
        if (!user || user.resetTokenExpires < new Date()) {
          throw new Error(errorMessages.invalidOrExpiredResetToken);
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        await user.save();
        return { message: "Password successfully reset" };
      } catch (error) {
        throw new Error(error.message);
      }
    }

     module.exports = resetPassword;