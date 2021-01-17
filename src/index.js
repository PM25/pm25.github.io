import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import About from "./about";
import Navigator from "./components/src/navigator";

ReactDOM.render(
    <React.StrictMode>
        <Navigator></Navigator>
        <About></About>
    </React.StrictMode>,
    document.getElementById("root")
);
