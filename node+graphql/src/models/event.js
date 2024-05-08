const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../db/db.js');
const InviteesEvent = require('./Invitee-event.js');
class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inviteeEmails: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName:'events',
    underscored: true,
    timestamps: true,
  }
);

Event.hasMany(InviteesEvent, { foreignKey: 'eventId', as: 'invitees' });
InviteesEvent.belongsTo(Event, { foreignKey: 'eventId' });


module.exports = Event;
