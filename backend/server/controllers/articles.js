// Imports
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt.utils");
const Articles = require("../models").Articles;

// Constantes

// Corps

module.exports = {
    postArticle: function (req, res) {
        // Params
        const title = req.body.title;
        const content = req.body.content;
        const likes = req.body.likes;
    }
}