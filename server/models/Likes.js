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
    user_liked_by: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
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
