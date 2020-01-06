"use strict";
module.exports = (sequelize, DataTypes) => {
  const Commentaires = sequelize.define(
    "Commentaires",
    {
      content: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    },
    {
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  );
  Commentaires.associate = function(models) {
    Commentaires.belongsTo(models.Article, {
      foreignKey: "articleId",
      onDelete: "CASCADE"
    });
    // associations can be defined here
  };
  return Commentaires;
};
