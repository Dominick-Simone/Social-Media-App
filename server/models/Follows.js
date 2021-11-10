const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follows extends Model {}

Follows.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
      }
    },
    followed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'follows'
  }
);

module.exports = Follows;
