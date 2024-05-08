 
 
const { format} = require('date-fns');

const Event = require("../../../../../models/event.js");
const errorMessages = require('../../../../../error-messages/error-messages.js');
require('dotenv').config();

 const updateEventById = async (_, { data}, { user }) => {
    try {
      const {id, title, description, date }  = data;
      if (!user) {
         throw new Error(errorMessages.userNotAuthenticated)
      }
      const event = await Event.findByPk(id);
      if (!event) {
        throw new Error(errorMessages.eventNotFound);
      }
      if (event.creatorId !== user.id) {
        throw new Error(errorMessages.unauthorizedUpdate);
      }
      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      await event.save();
      const formattedEvent = {
        ...event.dataValues,
        date: format(event.date, "yyyy-MM-dd HH:mm:ssXXX"),
      };
      return formattedEvent;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  module.exports = updateEventById;