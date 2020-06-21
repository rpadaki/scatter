import React, { Component } from "react";
import logo from "./logo.svg";
import io from "socket.io-client";
import "./App.css";

export default class App extends Component {
    constructor(props) {
        super();
        this.socket = io();
    }

    componentDidMount() {}

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}
