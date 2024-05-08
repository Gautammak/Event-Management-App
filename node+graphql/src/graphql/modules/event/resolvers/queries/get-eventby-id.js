 
 
const { format } = require('date-fns');

const Event = require("../../../../../models/event.js");
const User = require('../../../../../models/user.js')
const InviteesEvent = require('../../../../../models/Invitee-event.js')
const errorMessages = require('../../../../../error-messages/error-messages.js');
require('dotenv').config();


 const getEventById = async (_, { data }, { user }) => {
  try {

    const {id} = data;
    if (!user) {
      throw new Error(errorMessages.userNotAuthenticated);
    }

    const event = await Event.findByPk(id, {
      include: [
        {
          model: InviteesEvent,
          as: 'invitees',
          attributes: ['inviteeEmail', 'id', 'eventId'],
          include:{
            model:User,
            attributes:['userName','email'],
            as:'User'
          }
             
        },
      ],
    });
 

    const inviteeEmails = event.invitees.map(invitee => invitee.inviteeEmail);
      
    const formattedEvent = {
      ...event.dataValues,
      inviteeEmails,
      date: format(new Date(event.date), "yyyy-MM-dd HH:mm:ssXXX"),
    };

    return formattedEvent;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getEventById
