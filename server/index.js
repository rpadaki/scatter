const express = require("express");
const path = require("path");
const api = require("./api");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);
const EventEmitter = require("events");
const _ = require("lodash");

const gameStates = {};

class SocketManager extends EventEmitter {
    constructor() {
        super();
        this.gameToSocket = new Map();
        this.socketToGame = new Map();
    }

    listen() {
        io.on("connection", (socket) => {
            this.emit("connect", socket.id);

            socket.on("join", async (gameId, ack) => {
                if (this.socketToGame.has(socket)) {
                    console.log(
                        `Socket "${socket.id}" has already joined game "${gameId}".`
                    );
                    return;
                }

                if (!this.gameToSocket.get(gameId)) {
                    this.gameToSocket.set(gameId, []);
                    gameStates[gameId] = { size: 0 };
                }
                this.gameToSocket.get(gameId).push(socket);
                gameStates[gameId].size++;
                this.socketToGame.set(socket, gameId);

                ack();
            });

            socket.on("disconnect", () => {
                this.emit("disconnect", socket.id);
                if (!this.socketToGame.has(socket)) {
                    return;
                }

                const gameId = this.socketToGame.get(socket);
                this.socketToGame.delete(socket);

                if (this.gameToSocket.has(gameId)) {
                    _.remove(this.gameToSocket.get(gameId), socket);
                    gameStates[gameId].size--;
                    if (!this.gameToSocket.get(gameId).length) {
                        this.gameToSocket.delete(gameId);
                        delete gameStates[gameId];
                    }
                }
            });
        });
    }

    emit(type, ...args) {
        super.emit("*", type, ...args);
        return super.emit(type, ...args) || super.emit("", ...args);
    }
}

const socketManager = new SocketManager();

socketManager.on("connect", (socket_id) => {
    console.log(`A user connected: ${socket_id}.`);
});

socketManager.on("disconnect", (socket_id) => {
    console.log(`A user disconnected: ${socket_id}.`);
});

app.use("/api", api(gameStates));
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

socketManager.listen();

module.exports = server;
