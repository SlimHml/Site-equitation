"use strict";
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      title: DataTypes.STRING,
      allowNull: false
    },
    {}
  );
  Article.associate = function(models) {
    Article.hasMany(models.Commentaires, {
      foreignKey: "articleId",
      as: "commentaire"
    });
    // associations can be defined here
  };
  return Article;
};
