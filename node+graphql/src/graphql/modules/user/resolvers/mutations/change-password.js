
const bcrypt = require('bcrypt');
const User = require('../../../../../models/user')
const errorMessages = require('../../../../../error-messages/error-messages');
require('dotenv').config();

   const  changePassword = async (_, { data }) => {
      try {

      const  {email, oldPassword, newPassword}  = data;
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error(errorMessages.userNotFound);
        }
        const isValidPassword = await user.validPassword(oldPassword);
        if (!isValidPassword) {
          throw new Error(errorMessages.invalidOldPassword);
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return { message: "Password successfully changed" };
      } catch (error) {
        throw new Error(error.message);
      }
    }

    module.exports = changePassword;