// Imports

const bcrypt = require("bcrypt");
// Ne pas oublier le salage !!!
const jwtUtils = require("../utils/jwt.utils");
const Users = require("../models").Users;

// Constantes

const Email_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Password_REGEX = /^(?=.*\d).{4,8}$/;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 10;


// Corps

module.exports = {
  register: function (req, res) {
    // Params
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username == null || email == null || password == null) {
      return res.status(400).json({ error: "Des paramêtres sont manquants !" });
    }

    // Filtres Username et password
    if (username.length >= USERNAME_MAX_LENGTH || username.length <= USERNAME_MIN_LENGTH) {
      return res.status(400).json({
        error:
          "Le nom d'utilisateur doit comporter minimum 3 lettres et maximum 12 lettres"
      });
    }
    // Regex conditions Calls
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
      // Points de comparaisons dans la DB
      attributes: ["email"],
      where: { email: email }
    }).then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
          Users.create({
            username,
            email,
            password: bcryptedPassword,
            isAdmin: 0
          })
            .then(function (newUser) {
              return res.status(201).json({
                userId: newUser.id
              });
            })
            .catch(function (err) {
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
  login: function (req, res) {
    // Params
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
      return res.status(400).json({ error: "Des paramètres sont manquants !" });
    }

    Users.findOne({
      where: { email }
    })
      .then(function (userFound) {
        // à faire
        if (userFound) {
          bcrypt.compare(password, userFound.password, function (
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
          return res
            .status(404)
            .json({ error: "Cet utilisateur n'existe pas" });
        }
      })
      .catch(function (err) {
        // à faire
        return res
          .status(500)
          .json({ error: "Impossible de vérifier l'utilisateur" });
      });
  },
  getUserProfile: function (req, res) {
    //Obtenir l'authorisation de l'entête
    let headerAutho = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAutho);

    if (userId < 0) {
      return res.status(400).json({ error: "Token invalide !" });
    }

    Users.findOne({
      attributes: ["id", "username", "email"],
      where: { id: userId }
    })
      .then(function (user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "cannot fetch user" });
      });
  },
  updateUserProfile: function (req, res) {
    //Obtenir l'authorisation de l'entête
    const headerAutho = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAutho);

    // Paramètres que l'on souhaite update
    const username = req.body.username;
    const email = req.body.email;

    Users.findOne({
      attributes: ["id", "username", "email"],
      where: { id: userId }
    }).then(function (userFound) {
      if (userFound) {
        userFound
          .update({
            username: username ? username : userFound.username,
            email: email ? email : userFound.email
          })
          .then(function () {
            if (userFound) {
              res.status(201).json(userFound);
            } else {
              res
                .status(500)
                .json({ error: "Mise à jour incorrecte" });
            }
          })
          .catch(function (err) {
            res.status(500).json({ error: "Ne peut pas fetch le user" });
          })
      }
    })
  },
};
