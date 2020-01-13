'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    content: DataTypes.STRING,
    articleId: DataTypes.INTEGER
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};