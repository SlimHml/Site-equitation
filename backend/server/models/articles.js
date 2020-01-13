'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Articles.associate = function(models) {
    // associations can be defined here
  };
  return Articles;
};