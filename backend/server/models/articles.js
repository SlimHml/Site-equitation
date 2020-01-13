"use strict";
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    "Articles",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Articles.associate = function(models) {
    // associations can be defined here
    Articles.belongsTo(models.Users, {
      foreignKey: "Articles",
      onDelete: "CASCADE"
    });
  };
  return Articles;
};
