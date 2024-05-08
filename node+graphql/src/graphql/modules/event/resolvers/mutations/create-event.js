
const { format,parseISO } = require('date-fns');
const Event = require("../../../../../models/event.js");

const InviteesEvent = require('../../../../../models/Invitee-event.js')
const errorMessages = require('../../../../../error-messages/error-messages.js');
require('dotenv').config();


   const createEvent = async (_, { data}, { user }) => {
    try {  
      const { title, description, date, inviteeEmails}  = data;
      if (!user) {
        throw new Error(errorMessages.userNotAuthenticated);
      }
      const allInviteeEmails = [...inviteeEmails, user.email]; 
      const parsedDate = parseISO(date);
      const event = await Event.create({
        title,
        description,
        date: parsedDate,
        creatorId: user.id,
      });  
      const inviteeRecords = allInviteeEmails.map(inviteeEmail => ({
        inviteeEmail,
        eventId: event.id,
      }));  
      await InviteesEvent.bulkCreate(inviteeRecords);
      event.dataValues.date = format(parsedDate, 'yyyy-MM-dd HH:mm:ssXXX');
      return event;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  module.exports = createEvent;

