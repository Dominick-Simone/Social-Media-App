const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require("./User")
const Likes = require("./Likes")

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    author: {
        type: DataTypes.STRING,
        foreignKey: {
            ref: User,
            key: "username"
        }
    },
    post_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
        type: DataTypes.STRING,
        foreignKey: {
            ref: Likes,
            key: "post_id"
        }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
