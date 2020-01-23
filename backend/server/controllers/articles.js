// Imports
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const Articles = require("../models").Articles;

// Constantes

// Corps

module.exports = {
    createArticle: function (req, res) {
        // Params
        const title = req.body.title;
        const content = req.body.content;
        const likes = req.body.likes;

        // Obtenir l'authentification
        let headerAutho = req.headers["authorization"];
        let userId = jwtUtils.getUserId(headerAutho);

        // Conditions
        if (title.length <= 4) {
            return (res.status(400).json({ error: "Le titre doit comporter au moins 5 lettres" }))
        } else if (title == null) {
            return (res.status(400).json({ error: "Il faut un titre à l'article :)" }))
        } else if (content.length == null) {
            return (res.status(400).json({ error: "Le contenu de l'article ne peut être vide" }))
        } else {
            return (res.status(500).json({ error: "Erreur 500, la page n'existe pas" }))
        }
    },
    listArticle: function (req, res) {
        // à faire
    },
    deleteArticle: function (req, res) {
        // à faire
    },
}