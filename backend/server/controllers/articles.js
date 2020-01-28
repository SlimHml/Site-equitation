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
        // Obtenir l'authentification
        let headerAutho = req.headers["authorization"];
        let userId = jwtUtils.getUserId(headerAutho);

        // Params
        const username = req.body.username;
        const title = req.body.title;
        const content = req.body.content;


        // Conditions titres
        if (title.length < TITLE_LENGTH) {
            return (res.status(400).json({ error: "Le titre doit comporter au moins 5 lettres" }))
        }
        if (title.length == null) {
            return (res.status(400).json({ error: "Il faut un titre à l'article :)" }))
            // Conditions contents
        } else if (content.length < CONTENT_LENGTH) {
            return (res.status(400).json({ error: "Il faut au moins 10 caractères dans l'article" }))
        } else if (content.length == null) {
            return (res.status(400).json({ error: "Le contenu de l'article ne peut être vide" }))
        }


        // Afficher l'utilisateur ainsi que le bon attribut sur l'article
        Users.findOne({
            attributes: ["id", "username"],
            where: {
                id: userId,
                username: username
            }
        }).then(function (userFound) {
            if (userFound) {
                Articles.create({
                    title: title,
                    content: content,
                    userId: userFound.id,
                }).then(function (newArticle) {
                    if (newArticle) {
                        return res.status(201).json(newArticle);
                    } else {
                        return res.status(500).json({ error: "ne peut pas post l'article" })
                    }
                });
            } else {
                return res.status(404).json({ error: "Utilisateur non trouvé" })
            }
        }).catch(function (err) {
            return res.status(500).json({ error: "Incapable de vérifier l'utilisateur" })
        })
    },

    async listArticles(req, res) {
        // stockage au cas où let fields = req.query.fields;
        // stockage au cas où let limit = parseInt(req.query.limit);
        // stockage au cas où let offset = parseInt(req.query.offset);
        // stockage au cas où let order = req.query.order;

        let result = await Articles.findAll({
            include: [{
                model: Users,
                attributes: ["username"],
            }]
        }).then(function (articles) {
            return res.status(200).json(articles)
        }).catch(function (err) {
            return res.status(500).json({ error: "Impossible de retrouver les articles" })
        })
        return result;
    },
    deleteArticle: function (req, res) {
        // à faire
    },
}