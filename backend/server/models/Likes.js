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
    Likes.belongsToMany(models.Articles, {
      through: models.Likes,
      foreignKey: "userId",
      otherKey: "articleId"
    });
    Likes.belongsToMany(models.Users, {
      through: models.Likes,
      foreignKey: "articleId",
      otherKey: "userId"
    });
    Likes.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "users"
    });
    Likes.belongsTo(models.Articles, {
      foreignKey: "articleId",
      as: "articles"
    });
  };
  return Likes;
};
