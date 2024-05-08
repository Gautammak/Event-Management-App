
const  registerUser = require('../resolvers/mutations/user-register')
const loginUser  = require('../resolvers/mutations/user-login');
const logoutUser = require('../resolvers/mutations/user-logout');
const changePassword = require('../resolvers/mutations/change-password');
const updatePasswordRequest = require('../resolvers/mutations/update-request');
const resetPassword = require('../resolvers/mutations/reset-password');
const resolvers = {

    Mutation: {
      registerUser,
     loginUser,
     logoutUser,
     changePassword,
     updatePasswordRequest,
     resetPassword

    },
};

module.exports = resolvers;