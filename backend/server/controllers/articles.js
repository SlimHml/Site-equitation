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

        if (title.length <= 4) {
            return (res.status(400).json({ error: "Le titre doit comporter au moins 5 lettres" }))
        } else if (content.length == null) {
            return (res.status(400).json({ error: "Le contenu de l'article ne peut être vide" }))
        } else return (res.status(500).json({ error: "Erreur 500, la page n'existe pas" }))
    }
}