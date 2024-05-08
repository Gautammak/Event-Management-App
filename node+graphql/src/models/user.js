const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const sequelize = require('../db/db.js');
const InviteesEvent = require('./Invitee-event.js');
const Event = require('./event.js')
class User extends Model {
  validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    resetToken: {
      type: DataTypes.STRING,
    },
    resetTokenExpires: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: true,
  }
);


Event.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
User.hasMany(InviteesEvent, { foreignKey: 'inviteeEmail', sourceKey: 'email',as:'User' });
InviteesEvent.belongsTo(User, { foreignKey: 'inviteeEmail', targetKey: 'email',as:'User' });

module.exports = User;
