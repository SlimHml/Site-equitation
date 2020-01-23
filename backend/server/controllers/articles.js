// Imports
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const Articles = require("../models").Articles;
const Users = require("../models").Users;

// Constantes

const TITLE_LENGTH = 5;
const CONTENT_LENGTH = 10;

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

        // Conditions titres
        if (title.length < TITLE_LENGTH) {
            return (res.status(400).json({ error: "Le titre doit comporter au moins 5 lettres" }))
        }
        if (title == null) {
            return (res.status(400).json({ error: "Il faut un titre à l'article :)" }))
            // Conditions contents
        } else if (content.length < CONTENT_LENGTH) {
            return (res.status(400).json({ error: "Il faut au moins 10 caractères dans l'article" }))
        } else if (content == null) {
            return (res.status(400).json({ error: "Le contenu de l'article ne peut être vide" }))
        } else {
            (res.status(500).json({ error: "Erreur 500, la page n'existe pas" }))
        }
        Users.findOne({
            where: { id: userId }
        }).then
    },

    listArticle: function (req, res) {
        // à faire
    },
    deleteArticle: function (req, res) {
        // à faire
    },
}