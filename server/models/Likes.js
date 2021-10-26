const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require("./User")
const Post = require("./Post")

class Likes extends Model {}

Likes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    users_liked_by: {
        type: DataTypes.STRING,
        references: {
            model: "user",
            key: "username"
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "post",
            key: "id"
        }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'likes'
  }
);

module.exports = Likes;
