import React, { Component } from "react";

export default class Lobby extends Component {
    constructor(props) {
        super();
        this.state = {
            games: {},
        };
    }

    componentDidMount() {
        fetch("/api/games")
            .then((response) => response.json())
            .then((games) => this.setState({ games: games }));
    }

    render() {
        return (
            <div>
                {Object.entries(this.state.games).map(([gameId, gameData]) => (
                    <a key={gameId} href={`/game/${gameId}`}>
                        Game "{gameId}" of size {gameData.size}.
                    </a>
                ))}
            </div>
        );
    }
}
