import React, { Component } from "react";
import io from "socket.io-client";

const emitAsync = (socket, ...args) =>
    new Promise((resolve) => socket.emit(...args, resolve));

export default class Game extends Component {
    constructor(props) {
        super();
        this.state = {
            socket: null,
            gameId: undefined,
            username: "",
        };
    }

    static getDerivedStateFromProps(props, prevState) {
        return {
            ...prevState,
            gameId: props.match.params.gameId,
        };
    }

    async componentDidMount() {
        const socket = await io();
        this.setState({ socket: socket });
        emitAsync(this.state.socket, "join", this.state.gameId);
    }

    componentWillUnmount() {
        if (this.state.socket) {
            this.state.socket.disconnect();
        }
    }

    updateInputName(evt) {
        this.setState({
            username: evt.target.value,
        });
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.username}
                    onChange={(evt) => this.updateInputName(evt)}
                />
            </div>
        );
    }
}
