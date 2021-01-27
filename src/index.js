import React from "react";
import ReactDOM from "react-dom";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";
import Project from "./project";

ReactDOM.render(
    <React.StrictMode>
        <Navigator />
        <Project />
        <Footer />
    </React.StrictMode>,
    document.getElementById("root")
);
