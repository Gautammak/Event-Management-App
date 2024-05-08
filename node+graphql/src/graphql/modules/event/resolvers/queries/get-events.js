 
 
const { format} = require('date-fns');

const Event = require("../../../../../models/event.js");
const {Op,Sequelize} = require('sequelize');

const InviteesEvent = require('../../../../../models/Invitee-event.js');
const errorMessages = require('../../../../../error-messages/error-messages.js');
require('dotenv').config();


    const  getEvents = async(_, {}, { user }) =>{
      try {

        const {page = 1, limit = 10, sortBy, sortOrder, search, startDate, endDate }  = data;
        if (!user) {
          throw new Error(errorMessages.userNotAuthenticated);
        }
        const whereClause = {
          creatorId: user.id,
        };
        if (search) {
          whereClause.title = { [Op.iLike]: `%${search}%` };
        }
        if (startDate && endDate) {
          whereClause.date = {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          };
        }
        let events;
        const offset = (page - 1) * limit;
        const order = sortOrder === 'DESC' ? 'DESC' : 'ASC';
        const sortField = sortBy === 'date' ? 'date' : 'date';
        const createdEvents = await Event.findAll({
          attributes: ['id', 'title', 'description', 'date'],
          where: whereClause,
          order: [[sortField, order]],
          offset,
          limit,
        });
        let whereConditions = {
          attributes: ['id', 'title', 'description', 'date'],
          include: [
            {
              model: InviteesEvent,
              attributes: ['inviteeEmail'],
              as: 'invitees',
              where: {
                inviteeEmail: user.email,
              },
            },
          ],
          where: {},
          order: [[sortBy || 'date', sortOrder || 'ASC']],
          offset: (page - 1) * limit,
          limit,
        };
        if (startDate && endDate) {
          whereConditions.where.date = {
            [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
          };
        }
        if (search) {
          whereConditions.where = {
            [Sequelize.Op.and]: [
              whereConditions.where,
              {
                [Sequelize.Op.or]: [
                  { title: { [Sequelize.Op.iLike]: `%${search}%` } },
                  { description: { [Sequelize.Op.iLike]: `%${search}%` } },
                ],
              },
            ],
          };
        }     
        const userInvitedEvents = await Event.findAll(whereConditions);     
        events = [...createdEvents , ...userInvitedEvents];
        const formattedEvents = events.map((event) => ({
          ...event.dataValues,
          date: format(event.date, 'yyyy-MM-dd HH:mm:ssXXX'),
        }));
        return formattedEvents;    
      } catch (error) {
        throw new Error(error.message);
      }
    }

    module.exports = getEvents;

    