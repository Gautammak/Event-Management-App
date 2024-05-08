
const createEvent  = require('../../event/resolvers/mutations/create-event');
const inviteUser   = require('../resolvers/mutations/invite-user');
const updateEventById  = require('../resolvers/mutations/update-eventbyid');
const getEvents  = require('../resolvers/queries/get-events');
const getEventById  = require('../resolvers/queries/get-eventby-id');

const resolvers = {

    Mutation: {
     createEvent,
     inviteUser,
     updateEventById

    },
   
     Query : {
        getEventById,
        getEvents
     }

};

module.exports = resolvers;