import React from "react";
import ReactDOM from "react-dom";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";
import Home from "./home";

ReactDOM.render(
    <React.StrictMode>
        <Navigator />
        <Home />
        <Footer />
    </React.StrictMode>,
    document.getElementById("root")
);
