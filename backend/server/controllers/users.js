// Imports

const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const Users = require("../models").Users;
const asyncLib = require("async");

// Constantes

const Email_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Password_REGEX = /^(?=.*\d).{4,8}$/;

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
    if (username.length >= 13 || username.length <= 2) {
      return res.status(400).json({
        error:
          "Le nom d'utilisateur doit comporter minimum 3 lettres et maximum 12 lettres"
      });
    }
    if (!Email_REGEX.test(email)) {
      return res.status(400).json({ error: "L'email n'est pas valide" });
    }
    if (!Password_REGEX.test(password)) {
      return res.status(400).json({
        error:
          "Le mot de passe doit comprendre entre 4 et 8 caractères dont au moins 1 chiffre"
      });
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
    function getUserProfile(req, res) {
      //Obtenir l'authorisation de l'entête
      let headerAutho = req.headers["authorization"];
      let userId = jwtUtils.getUserId(headerAutho);
      if (userId < 0) return res.status(400).json({ error: "Token invalide" });

      Users.findOne({
        attributes: ["id", "username", "email"],
        where: { id: userId }
      })
        .then(function(user) {
          if (user) {
            res.status(201).json(user);
          } else {
            res.status(404).json({ error: "Utilisateur non reconnu" });
          }
        })
        .catch(function(err) {
          res.status(500).json({ error: "Ne peut pas fetch le user" });
        });
    }
  }
};
