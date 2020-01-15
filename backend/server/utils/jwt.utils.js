// Imports
const jwt = require("jsonwebtoken");

// Fonctions exportées
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    });
  }
};
