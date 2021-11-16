const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
      }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    modelName: 'comments'
  }
);

module.exports = Comments;
