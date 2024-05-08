

const bcrypt = require('bcrypt');

const User = require('../../../../../models/user.js')
const InviteesEvent = require('../../../../../models/Invitee-event.js')
const errorMessages = require('../../../../../error-messages/error-messages.js');
require('dotenv').config();
const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD



 const  inviteUser = async (_, { data}, { user }) => {
  try {

    const {eventId, inviteeEmails } = data;
    if (!user) {
      throw new Error(errorMessages.userNotAuthenticated);
    }
    const createdUsers = [];
    for (const inviteeEmail of inviteeEmails) {
      const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
      try {
        const existingUser = await User.findOne({ where: { email: inviteeEmail } });
        if (!existingUser) {
          const newUser = await User.create({
            userName: DEFAULT_USERNAME,
            email: inviteeEmail,
            password: hashedPassword,
          });
          createdUsers.push({
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
          });
        }
        await InviteesEvent.create({
          inviteeEmail,
          eventId,
        });
      } catch (error) {
        console.error('Error creating user or invitee event:', error);
      }
    }
    return { message: 'Users invited successfully', eventId,inviteeEmails };
  } catch (error) {
    console.error('Error in inviteUser mutation:', error);
    throw new Error(error.message);
  }
}


module.exports = inviteUser;