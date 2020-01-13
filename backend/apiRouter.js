// Imports
import express from "express";
import usersCtrl from "./routes/usersCtrl";

// Router
exports.router = (function() {
  let apiRouter = express.Router();
  // Users routes
  apiRouter.route("/user/register").post(usersCtrl.register);
  apiRouter.route("/user/login").post(usersCtrl.login);
  return apiRouter;
})();
