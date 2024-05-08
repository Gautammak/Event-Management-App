
const User = require('../../../../../models/user')
require('dotenv').config();

   const logoutUser = async (_, { data }) => {
      try {
        const {  email } = data;
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error(errorMessages.userNotFound);
        }
        user.token = null;
        await user.save();
        return { message: "User successfully logged out" };
      } catch (error) {
        throw new Error(error.message);
      }
    }

    module.exports = logoutUser;