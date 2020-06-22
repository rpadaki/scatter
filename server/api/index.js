const express = require("express");

const api = express.Router();

module.exports = (gameStates) => {
    api.get("/games", (req, res) => {
        res.status(200).json(gameStates);
    });

    return api;
};
