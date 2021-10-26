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
      autoIncrement: true,
      unique: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "user",
            key: "username"
        }
    },
    post_text: {
      type: DataTypes.STRING,
      allowNull: false
    }
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
