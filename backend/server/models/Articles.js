'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    // likes: DataTypes.INTEGER
  }, {});
  Articles.associate = function (models) {
    // associations can be defined here
  };
  return Articles;
};