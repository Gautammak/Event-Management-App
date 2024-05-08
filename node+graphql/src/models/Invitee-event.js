const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');
const sequelize = require('../db/db.js');
class InviteesEvent extends Model {}

InviteesEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    inviteeEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'InviteesEvent',
    tableName:'invitees_events',
    underscored: true,
    timestamps: true,
  }
);

module.exports = InviteesEvent;