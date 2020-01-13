"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  });
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Articles, {
      foreignKey: "Articles",
      as: "Articles"
    });
  };
  return Users;
};
