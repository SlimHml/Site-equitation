// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/").Users;

//Routes
module.exports = {
  register: function(req, res) {
    // Params
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username === null || email === null || password === null) {
      return res.status(400).json({ error: "il manque des paramètres !" });
    }

    Users.findOne({
      attributes: ["email"],
      where: { email: email }
    }).then(function(userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function(err, bcryptedPassword) {
          const newUser = Users.create({
            username,
            email,
            password: bcryptedPassword,
            isAdmin: 0
          })
            .then(function(newUser) {
              return res.status(201).json({
                userId: newUser.id
              });
            })
            .catch(function(err) {
              return res
                .status(500)
                .json({ error: "Impossible de vérifier l'utilisateur" });
            });
        });
      } else {
        return res.status(409).json({ error: "L'utilisateur existe déjà" });
      }
    });
  },
  login: (req, res) => {
    // à faire
  }
};
