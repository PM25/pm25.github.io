import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import About from "./about";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";

ReactDOM.render(
    <React.StrictMode>
        <Navigator></Navigator>
        <About></About>
        <Footer></Footer>
    </React.StrictMode>,
    document.getElementById("root")
);
