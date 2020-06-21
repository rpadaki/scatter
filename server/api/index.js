const express = require("express");

const api = express.Router();

module.exports = (gameStates) => {
    api.get("/games", (req, res) => {
        res.status(200).json(Object.keys(gameStates));
    });

    api.post("/games/:gameId", (req, res) => {
        if (req.params.gameId in gameStates) {
            res.status(409).send(`Game "${req.params.gameId}" already exists!`);
        } else {
            gameStates[req.params.gameId] = {
                id: req.params.gameId,
                players: [],
            };
            res.status(200).send(`Game "${req.params.gameId}" created!`);
        }
    });

    api.post("/games/:gameId/join", (req, res) => {});

    return api;
};
