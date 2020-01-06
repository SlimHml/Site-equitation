'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentaires = sequelize.define('Commentaires', {
    content: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  Commentaires.associate = function(models) {
    // associations can be defined here
  };
  return Commentaires;
};