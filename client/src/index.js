import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Game, Lobby } from "./pages";
import "./style.css";
import * as serviceWorker from "./serviceWorker";

const App = () => (
    <div>
        <div>
            <a href="/">Lobby</a>
        </div>
        <Router>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/game/:gameId" component={Game} />
        </Router>
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
