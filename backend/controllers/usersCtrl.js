import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// routes
module.exports = {
  register: function(req, res) {
    // à faire: implémenter
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;
    let email = req.body.email;
    let password = req.body.password;

    if (lastname == null || firstname == null || password == null) {
      return res.status(400).json({ erreur: "paramètres manquants !" });
    }
  },
  login: function(req, res) {
    // à faire: implémenter
  }
};
