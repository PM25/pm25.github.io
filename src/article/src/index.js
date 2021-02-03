import React from "react";
import ReactDOM from "react-dom";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";
import Article from "./article";

ReactDOM.render(
    <React.StrictMode>
        <Navigator />
        <Article />
        <Footer />
    </React.StrictMode>,
    document.getElementById("root")
);
