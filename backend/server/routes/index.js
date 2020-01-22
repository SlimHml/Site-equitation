// Imports
const express = require("express");
const usersController = require("../controllers").users;

// Routes

module.exports = function (router) {
  router.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Equitation API!"
    })
  );
  // Users Routes

  router.post("/api/users/register", usersController.register);
  router.post("/api/users/login", usersController.login);
  router.get("/api/users/profile", usersController.getUserProfile);
  router.put("/api/users/profile", usersController.updateUserProfile);
};
