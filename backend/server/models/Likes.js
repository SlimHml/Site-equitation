"use strict";
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      articleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Articles",
          key: "id"
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      }
    },
    {}
  );
  Likes.associate = function(models) {
    // associations can be defined here
  };
  return Likes;
};
