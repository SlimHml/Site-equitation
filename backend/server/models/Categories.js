"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "Categories",
    {
      content: DataTypes.STRING,
      articleId: DataTypes.INTEGER
    },
    {}
  );
  Categories.associate = function(models) {
    // associations can be defined here
    Categories.belongsTo(models.Articles, {
      foreignKey: "articleId",
      onDelete: "CASCADE"
    });
  };
  return Categories;
};
