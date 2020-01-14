// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models").Users;

//Routes
module.exports = {
  register: (req, res) => {
    // Params
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username === null || email === null || password === null) {
      return res.status(400).json({ erreur: "il manque des paramètres !" });
    }
    Users.findOne({
      attributes: ["email"],
      where: { email }
    }).then(function(userFound) {
      // à faire
      if (!userFound) {
        bcrypt
          .hash(password, 5, function(err, bcryptedPassword) {
            const newUser = Users.create({
              username: username,
              email: email,
              password: bcryptedPassword
            }).then(function(newUser) {
              return res.status(201).json({
                userId: newUser.id
              });
            });
          })
          .catch(function(err) {
            return res
              .status(500)
              .json({ error: "Impossible de vérifier l'utilisateur" });
          });
      }
    });
  },
  login: (req, res) => {
    // à faire
  }
};
