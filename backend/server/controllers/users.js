// Imports
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const Users = require("../models").Users;

//Routes
module.exports = {
  register: function(req, res) {
    // Params
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username === null || email === null || password === null) {
      return res.status(400).json({ error: "Des paramêtres sont manquants !" });
    }
    Users.findOne({
      attributes: ["email"],
      where: { email }
    }).then(function(userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function(err, bcryptedPassword) {
          let newUser = Users.create({
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
        return res.status(400).json({ error: "L'utilisateur existe déjà" });
      }
    });
  },
  login: function(req, res) {
    // Params
    const email = req.body.email;
    const password = req.body.password;

    if (email === null || password === null) {
      return res.status(400).json({ error: "Des paramètres sont manquants !" });
    }
    Users.findOne({
      where: { email }
    })
      .then(function(userFound) {
        // à faire
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(
            errBycrypt,
            resBycrypt
          ) {
            if (resBycrypt) {
              return res.status(200).json({
                userId: userFound.id,
                token: jwtUtils.generateTokenForUser(userFound)
              });
            } else {
              return res.status(404).json({ error: "mot de passe invalide" });
            }
          });
        } else {
          return res.status(404).json({ error: "Cet email n'est pas valide" });
        }
      })
      .catch(function(err) {
        // à faire
        return res
          .status(500)
          .json({ error: "Impossible de vérifier l'utilisateur" });
      });
  }
};
