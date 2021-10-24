const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require("./User")
const Post = require("./Post")

class Likes extends Model {}

Likes.init(
  {
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    users_liked_by: {
        type: DataTypes.STRING,
        foreignKey: {
            ref: User,
            key: "username"
        }
    },
    post_id: {
        type: DataTypes.STRING,
        foreignKey: {
            ref: Post,
            key: "id"
        }
    },
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
