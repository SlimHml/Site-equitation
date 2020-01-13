"use strict";
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Article.associate = function(models) {
    // associations can be defined here
    models.Article.belongsTo(models.User, {
      foreignKey: "Article",
      onDelete: "CASCADE"
    });
  };
  return Article;
};
